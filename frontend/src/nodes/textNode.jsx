import { useState } from "react";
import { Handle, Position } from "reactflow";
import { InputSVG } from "../icons";
import * as Node from "../components/BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <Node.Root>
      <Node.Info
        icon={<InputSVG size={24} />}
        title="Text"
        description=" Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes."
      />
      <Node.Body>
        <Node.Chip>text_0</Node.Chip>
        <Node.InputField
          label={"Text"}
          value={currText}
          onChange={handleTextChange}
        />
      </Node.Body>
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </Node.Root>
  );
};
