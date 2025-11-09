import { Handle, Position } from "reactflow";
import { LlmSVG } from "../../icons";
import * as Node from "../commons/BaseNode";
import { useState } from "react";
import { dropdownTypeOptions as options } from "../../constants/dropdownTypes";

export const LLMNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.model || "");
  const [instructions, setInstructions] = useState(data?.instructions || "");
  const [prompt, setPrompt] = useState(data?.prompt || "");

  const handleModelChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <Node.Root>
        <Node.Info icon={<LlmSVG size={24} />} title="OpenAI" />
        <Node.Body>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-system`}
            style={{ top: `${100 / 3}%` }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-prompt`}
            style={{ top: `${200 / 3}%` }}
          />
          <Node.Chip>{data.id}</Node.Chip>
          <Node.InputField
            textarea={true}
            label={"System (Instructions)"}
            value={instructions}
            onChange={handleInstructionsChange}
            placeholder="Answer the Question based on Context in a professional manner."
          />
          <Node.InputField
            allowVariables={true}
            label={"Prompt"}
            placeholder={`Type a prompt or "{{" to utilize variables`}
            value={prompt}
            onChange={handlePromptChange}
          />
          <Node.Dropdown
            label={"Model"}
            options={options}
            value={currName}
            onChange={handleModelChange}
          />
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-response`}
          />
        </Node.Body>
      </Node.Root>
    </div>
  );
};
