import { AuthProvider, AuthCredentials, AuthToken } from './types';
import { createHash } from 'crypto';

export class BasicAuthProvider implements AuthProvider {
  private tokens: Map<string, AuthToken>;
  private users: Map<string, { password: string; permissions: string[] }>;

  constructor() {
    this.tokens = new Map();
    this.users = new Map();
  }

  async addUser(userId: string, password: string, permissions: string[] = []): Promise<void> {
    const hashedPassword = this.hashPassword(password);
    this.users.set(userId, { password: hashedPassword, permissions });
  }

  async authenticate(credentials: AuthCredentials): Promise<AuthToken> {
    if (credentials.type !== 'basic' || !credentials.userId || !credentials.password) {
      throw new Error('Invalid credentials');
    }

    const user = this.users.get(credentials.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = this.hashPassword(credentials.password);
    if (hashedPassword !== user.password) {
      throw new Error('Invalid password');
    }

    const token: AuthToken = {
      token: this.generateToken(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      userId: credentials.userId,
      permissions: user.permissions
    };

    this.tokens.set(token.token, token);
    return token;
  }

  async validate(token: string): Promise<boolean> {
    const tokenData = this.tokens.get(token);
    if (!tokenData) return false;
    if (tokenData.expiresAt < Date.now()) {
      this.tokens.delete(token);
      return false;
    }
    return true;
  }

  async refresh(token: string): Promise<AuthToken> {
    const tokenData = this.tokens.get(token);
    if (!tokenData || tokenData.expiresAt < Date.now()) {
      throw new Error('Invalid or expired token');
    }

    const newToken: AuthToken = {
      ...tokenData,
      token: this.generateToken(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };

    this.tokens.delete(token);
    this.tokens.set(newToken.token, newToken);
    return newToken;
  }

  async revoke(token: string): Promise<void> {
    this.tokens.delete(token);
  }

  private generateToken(): string {
    return createHash('sha256')
      .update(Math.random().toString())
      .digest('hex');
  }

  private hashPassword(password: string): string {
    return createHash('sha256')
      .update(password)
      .digest('hex');
  }
}
