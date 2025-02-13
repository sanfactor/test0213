import { PipelineExecutor } from '../../runtime/pipeline';
import { Pipeline, Trigger, Action } from '../../types';

describe('PipelineExecutor', () => {
  let pipelineExecutor: PipelineExecutor;

  beforeEach(() => {
    pipelineExecutor = new PipelineExecutor();
  });

  test('should execute pipeline successfully', async () => {
    const mockAction: Action = {
      type: 'test',
      execute: jest.fn().mockResolvedValue(undefined)
    };

    const mockTrigger: Trigger = {
      type: 'test',
      condition: { test: true }
    };

    const pipeline: Pipeline = {
      id: 'test-pipeline',
      name: 'Test Pipeline',
      triggers: [mockTrigger],
      actions: [mockAction]
    };

    const initialData = { test: true };
    const result = await pipelineExecutor.executePipeline(pipeline, initialData);

    expect(result.status).toBe('completed');
    expect(mockAction.execute).toHaveBeenCalled();
  });

  test('should fail when trigger conditions are not met', async () => {
    const mockAction: Action = {
      type: 'test',
      execute: jest.fn().mockResolvedValue(undefined)
    };

    const mockTrigger: Trigger = {
      type: 'test',
      condition: { test: true }
    };

    const pipeline: Pipeline = {
      id: 'test-pipeline',
      name: 'Test Pipeline',
      triggers: [mockTrigger],
      actions: [mockAction]
    };

    const initialData = { test: false };
    const result = await pipelineExecutor.executePipeline(pipeline, initialData);

    expect(result.status).toBe('failed');
    expect(mockAction.execute).not.toHaveBeenCalled();
  });
});
