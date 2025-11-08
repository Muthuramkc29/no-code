import { useState } from "react";
import { Handle, Position } from "reactflow";
import { InputSVG } from "../../icons";
import * as Node from "../commons/BaseNode";
import { dropdownTypeOptions as options } from "../../constants/dropdownTypes";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <Node.Root>
      <Node.Info
        icon={<InputSVG size={24} />}
        title="Input"
        description="Pass data of different types into your workflow"
      />
      <Node.Body>
        <Node.Chip>input_0</Node.Chip>

        <Node.Suggestion tip="Give the node a distinct name" />
        <Node.Dropdown
          label={"Type"}
          options={options}
          value={inputType}
          onChange={handleTypeChange}
        />
      </Node.Body>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </Node.Root>
  );
};
