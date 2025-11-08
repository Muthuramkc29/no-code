import { DraggableNode } from "../commons/DraggableNode";
import { TOOLBAR } from "../../constants/pipelineToolbar";

export const PipelineToolbar = () => {
  return (
    <div className="p-2.5">
      <div className="flex flex-wrap gap-2.5">
        {Object.keys(TOOLBAR.START).map((nodeType) => {
          const node = TOOLBAR.START[nodeType];
          const Icon = node.icon;

          return (
            <DraggableNode
              key={node.type}
              type={node.type}
              label={node.label}
              renderIcon={<Icon />}
            />
          );
        })}
      </div>
    </div>
  );
};
