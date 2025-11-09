import { Handle, Position } from "reactflow";
import { DataCollectorSVG } from "../../icons";
import * as Node from "../commons/BaseNode";

export const DataCollectorNode = ({ id, data }) => {
  return (
    <Node.Root>
      <Node.Info
        icon={<DataCollectorSVG size={24} />}
        title="Data Collector"
        description="Allows a chatbot to collect information by asking the user to provide specific pieces of information (e.g., name, email, etc.)."
      />
      <Node.Body>
        <Node.Chip>{data.id}</Node.Chip>

        <Node.Suggestion tip="Give the node a distinct name" />
        <Node.InputField label={"Query"} allowVariables={true} />
      </Node.Body>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </Node.Root>
  );
};
