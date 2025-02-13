export interface Plugin {
  id: string;
  version: string;
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}

export interface ContextChain {
  id: string;
  data: Record<string, any>;
  previous?: ContextChain;
  next?: ContextChain;
}

export interface Trigger {
  type: string;
  condition: Record<string, any>;
}

export interface Action {
  type: string;
  execute(context: ContextChain): Promise<void>;
}

export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  triggers: Trigger[];
  actions: Action[];
}

export interface ExecutionContext {
  pipelineId: string;
  contextChain: ContextChain;
  startTime: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error?: Error;
}
