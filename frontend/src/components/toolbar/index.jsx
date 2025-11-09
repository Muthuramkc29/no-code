import { DraggableNode } from "../commons/DraggableNode";
import { TOOLBAR } from "../../constants/pipelineToolbar";

const PipelineToolbar = () => {
  return (
    <div className="p-2.5">
      <div className="flex flex-wrap gap-2.5">
        {Object.keys(TOOLBAR).map((nodeType) => {
          const node = TOOLBAR[nodeType];
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

export default PipelineToolbar;
