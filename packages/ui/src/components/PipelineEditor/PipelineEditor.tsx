import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeChange,
  EdgeChange,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PipelineData, NodeData, EdgeData } from './types';
import { TriggerNode } from './NodeTypes/TriggerNode';
import { ActionNode } from './NodeTypes/ActionNode';
import { Toolbar } from './Toolbar';

interface PipelineEditorProps {
  initialData?: PipelineData;
  onChange?: (data: PipelineData) => void;
  readOnly?: boolean;
}

export const PipelineEditor: React.FC<PipelineEditorProps> = ({
  initialData,
  onChange,
  readOnly = false
}) => {
  const [nodes, setNodes] = useState<Node[]>(initialData?.nodes || []);
  const [edges, setEdges] = useState<Edge[]>(initialData?.edges || []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => {
      const newNodes = [...nds];
      changes.forEach((change) => {
        if ('id' in change) {
          const index = newNodes.findIndex((n) => n.id === change.id);
          if (index !== -1) {
            newNodes[index] = { ...newNodes[index], ...change };
          }
        }
      });
      return newNodes;
    });
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => {
      const newEdges = [...eds];
      changes.forEach((change) => {
        if ('id' in change) {
          const index = newEdges.findIndex((e) => e.id === change.id);
          if (index !== -1) {
            newEdges[index] = { ...newEdges[index], ...change };
          }
        }
      });
      return newEdges;
    });
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    []
  );

  const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
  };

  const onAddTrigger = useCallback(() => {
    const newNode = {
      id: `trigger-${Date.now()}`,
      type: 'trigger',
      position: { x: 100, y: 100 },
      data: { label: 'New Trigger', type: 'event' }
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const onAddAction = useCallback(() => {
    const newNode = {
      id: `action-${Date.now()}`,
      type: 'action',
      position: { x: 300, y: 100 },
      data: { label: 'New Action', type: 'process' }
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const onSave = useCallback(() => {
    const pipelineData: PipelineData = {
      nodes: nodes as NodeData[],
      edges: edges as EdgeData[]
    };
    onChange?.(pipelineData);
  }, [nodes, edges, onChange]);

  const onClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar
        onAddTrigger={onAddTrigger}
        onAddAction={onAddAction}
        onSave={onSave}
        onClear={onClear}
      />
      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
