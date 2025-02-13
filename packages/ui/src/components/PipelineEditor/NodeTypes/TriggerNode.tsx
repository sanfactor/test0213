import React from 'react';
import { Handle, Position } from 'reactflow';

interface TriggerNodeProps {
  data: {
    label: string;
    type: string;
    condition: Record<string, any>;
  };
}

export const TriggerNode: React.FC<TriggerNodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-gray-200">
      <Handle type="source" position={Position.Right} />
      <div className="font-bold text-sm">{data.label}</div>
      <div className="text-xs text-gray-500">{data.type}</div>
    </div>
  );
};
