export interface NodeData {
  id: string;
  type: 'trigger' | 'action';
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
}

export interface PipelineData {
  nodes: NodeData[];
  edges: EdgeData[];
}
