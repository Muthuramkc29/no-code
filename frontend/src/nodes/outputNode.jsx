// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import { OutputSVG } from "../icons";
import * as Node from "../components/BaseNode";
import { dropdownTypeOptions as options } from "../constants/dropdownTypes";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <Node.Root>
      <Node.Info
        icon={<OutputSVG size={24} />}
        title="Output"
        description="Output data of different types from your workflow."
      />
      <Node.Body>
        <Node.Chip>output_0</Node.Chip>
        <Node.Dropdown
          label={"Type"}
          options={options}
          value={outputType}
          onChange={handleTypeChange}
        />
        <Node.InputField
          label={"Output"}
          value={currName}
          onChange={handleNameChange}
        />
      </Node.Body>
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
    </Node.Root>
  );
};
