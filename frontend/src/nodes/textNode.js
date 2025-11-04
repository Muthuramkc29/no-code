// textNode.js
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { BaseNode, InputField } from "../components/BaseNode";

const TextNodeWrapper = styled(BaseNode)`
  // Custom styles specific to TextNode can be added here
`;

const AutoResizeInput = styled(InputField)`
  resize: none;
  min-height: 40px;
  transition: height 0.2s ease;
`;

const VARIABLE_REGEX = /\{\{([^}]+)\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);

  const extractVariables = useCallback((text) => {
    const matches = Array.from(text.matchAll(VARIABLE_REGEX));
    return matches.map((match) => match[1].trim());
  }, []);

  useEffect(() => {
    const foundVariables = extractVariables(currText);
    setVariables(foundVariables);
  }, [currText, extractVariables]);

  const handleTextChange = (e) => {
    const { value, scrollHeight } = e.target;
    setCurrText(value);
  };

  return (
    <TextNodeWrapper
      id={id}
      title="Text Node"
      inputs={variables.map((variable) => ({ id: variable }))}
      outputs={[{ id: "output" }]}
      data={data}
    >
      <AutoResizeInput
        as="textarea"
        value={currText}
        onChange={handleTextChange}
        placeholder="Enter text with variables like {{variableName}}"
      />
    </TextNodeWrapper>
  );
};
