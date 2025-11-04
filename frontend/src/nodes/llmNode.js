// llmNode.js
import React from "react";
import styled from "styled-components";
import { BaseNode } from "../components/BaseNode";

const LLMNodeWrapper = styled(BaseNode)`
  // Custom styles specific to LLMNode can be added here
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9em;
`;

export const LLMNode = ({ id, data }) => {
  const inputs = [
    { id: "system", label: "System" },
    { id: "prompt", label: "Prompt" },
  ];

  const outputs = [{ id: "response", label: "Response" }];

  return (
    <LLMNodeWrapper
      id={id}
      title="LLM"
      inputs={inputs}
      outputs={outputs}
      data={data}
    >
      <Description>Large Language Model Node</Description>
    </LLMNodeWrapper>
  );
};
