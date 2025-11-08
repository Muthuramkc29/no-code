import { DraggableNode } from "../commons/DraggableNode";
import * as NodeIcons from "../../icons";
import { TOOLBAR } from "../../constants/pipelineToolbar";

export const PipelineToolbar = () => {
  return (
    <div className="p-2.5">
      <div className="mt-5 flex flex-wrap gap-2.5">
        {Object.keys(TOOLBAR.basic).map((key) => {
          const node = TOOLBAR.basic[key];
          const Icon = NodeIcons[node.icon];

          return (
            <DraggableNode
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
