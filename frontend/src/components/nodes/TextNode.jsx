import { useState } from "react";
import { Handle, Position } from "reactflow";
import { TextSVG } from "../../icons";
import * as Node from "../commons/BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <Node.Root>
      <Node.Info
        icon={<TextSVG size={24} />}
        title="Text"
        description="Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes."
      />
      <Handle type="target" position={Position.Left} id={`${id}-text`} />
      <Node.Body>
        <Node.Chip>{data.id}</Node.Chip>
        <Node.InputField
          allowVariables={true}
          label={"Text"}
          placeholder={`Type "{{" to utilize variables`}
          value={currText}
          onChange={handleTextChange}
        />
      </Node.Body>
      <Handle type="source" position={Position.Right} id={`${id}-text`} />
    </Node.Root>
  );
};
