import { ContextManager } from '../../runtime/context';

describe('ContextManager', () => {
  let contextManager: ContextManager;

  beforeEach(() => {
    contextManager = new ContextManager();
  });

  test('should create a new chain', () => {
    const data = { key: 'value' };
    const chain = contextManager.createChain('test-chain', data);

    expect(chain).toBeDefined();
    expect(chain.id).toBe('test-chain');
    expect(chain.data).toEqual(data);
  });

  test('should link chains correctly', () => {
    const chain1 = contextManager.createChain('chain1', { step: 1 });
    const chain2 = contextManager.createChain('chain2', { step: 2 });

    contextManager.linkChains('chain1', 'chain2');

    expect(chain1.next).toBe(chain2);
    expect(chain2.previous).toBe(chain1);
  });

  test('should update chain data', () => {
    const chain = contextManager.createChain('test-chain', { initial: 'data' });
    contextManager.updateChainData('test-chain', { new: 'value' });

    const updated = contextManager.getChain('test-chain');
    expect(updated?.data).toEqual({ initial: 'data', new: 'value' });
  });
});
