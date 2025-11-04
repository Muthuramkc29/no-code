// BaseNode.js
import React from "react";
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  type,
  title,
  children,
  inputs = [],
  outputs = [],
  data = {},
  className,
}) => {
  return (
    <div
      className={`p-4 bg-white border border-gray-200 rounded-md shadow-default transition-all duration-200 min-w-[200px] hover:shadow-hover ${className}`}
    >
      {inputs.map((input, index) => (
        <Handle
          key={`${id}-input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="!bg-secondary"
          style={{
            top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
          }}
        />
      ))}

      <div className="mb-2 text-primary font-bold">{title}</div>
      <div className="text-gray-700">{children}</div>

      {outputs.map((output, index) => (
        <Handle
          key={`${id}-output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="!bg-secondary"
          style={{
            top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
          }}
        />
      ))}
    </div>
  );
};

export const InputField = ({ className, ...props }) => (
  <textarea
    className={`w-full px-1 py-1 border border-gray-200 rounded-sm mt-1 focus:outline-none focus:border-primary ${className}`}
    {...props}
  />
);

export const Label = ({ className, ...props }) => (
  <label
    className={`block mb-1 text-gray-700 text-sm ${className}`}
    {...props}
  />
);
