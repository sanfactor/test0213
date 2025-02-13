import { ContextChain } from '../types';

export class ContextManager {
  private chains: Map<string, ContextChain>;

  constructor() {
    this.chains = new Map();
  }

  createChain(id: string, data: Record<string, any>): ContextChain {
    const chain: ContextChain = { id, data };
    this.chains.set(id, chain);
    return chain;
  }

  linkChains(previousId: string, nextId: string): void {
    const previous = this.chains.get(previousId);
    const next = this.chains.get(nextId);

    if (previous && next) {
      previous.next = next;
      next.previous = previous;
    }
  }

  getChain(id: string): ContextChain | undefined {
    return this.chains.get(id);
  }

  updateChainData(id: string, data: Record<string, any>): void {
    const chain = this.chains.get(id);
    if (chain) {
      chain.data = { ...chain.data, ...data };
    }
  }
}
