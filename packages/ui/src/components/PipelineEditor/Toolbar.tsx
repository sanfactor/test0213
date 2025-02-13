import React from 'react';
import { FiPlus, FiSave, FiPlay, FiTrash2 } from 'react-icons/fi';

interface ToolbarProps {
  onAddTrigger?: () => void;
  onAddAction?: () => void;
  onSave?: () => void;
  onRun?: () => void;
  onClear?: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onAddTrigger,
  onAddAction,
  onSave,
  onRun,
  onClear
}) => {
  return (
    <div className="flex gap-2 p-2 bg-white border-b border-gray-200">
      <button
        onClick={onAddTrigger}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <FiPlus /> Add Trigger
      </button>
      <button
        onClick={onAddAction}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
      >
        <FiPlus /> Add Action
      </button>
      <div className="flex-grow" />
      <button
        onClick={onSave}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        <FiSave /> Save
      </button>
      <button
        onClick={onRun}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        <FiPlay /> Run
      </button>
      <button
        onClick={onClear}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
        <FiTrash2 /> Clear
      </button>
    </div>
  );
};
