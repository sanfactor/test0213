import { Pipeline, Trigger, Action, ContextChain, ExecutionContext } from '../types';
import { ContextManager } from './context';

export class PipelineExecutor {
  private contextManager: ContextManager;

  constructor() {
    this.contextManager = new ContextManager();
  }

  async executePipeline(pipeline: Pipeline, initialData: Record<string, any>): Promise<ExecutionContext> {
    const context: ExecutionContext = {
      pipelineId: pipeline.id,
      contextChain: this.contextManager.createChain(pipeline.id, initialData),
      startTime: new Date(),
      status: 'pending'
    };

    try {
      context.status = 'running';
      
      // Check triggers
      const triggersValid = await this.evaluateTriggers(pipeline.triggers, context.contextChain);
      if (!triggersValid) {
        throw new Error('Pipeline triggers conditions not met');
      }

      // Execute actions
      for (const action of pipeline.actions) {
        await action.execute(context.contextChain);
      }

      context.status = 'completed';
    } catch (error) {
      context.status = 'failed';
      context.error = error as Error;
    }

    return context;
  }

  private async evaluateTriggers(triggers: Trigger[], context: ContextChain): Promise<boolean> {
    // Simple implementation - can be extended based on specific trigger types
    return triggers.every(trigger => 
      Object.entries(trigger.condition).every(([key, value]) => 
        context.data[key] === value
      )
    );
  }
}
