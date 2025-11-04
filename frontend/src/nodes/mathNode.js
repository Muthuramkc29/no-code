// mathNode.js
import React, { useState } from "react";
import styled from "styled-components";
import { BaseNode, InputField, Label } from "../components/BaseNode";

const MathNodeWrapper = styled(BaseNode)`
  min-width: 250px;
`;

const Select = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "add");

  const inputs = [
    { id: "input1", label: "Input 1" },
    { id: "input2", label: "Input 2" },
  ];

  const outputs = [{ id: "result", label: "Result" }];

  return (
    <MathNodeWrapper
      id={id}
      title="Math Operation"
      inputs={inputs}
      outputs={outputs}
      data={data}
    >
      <Label>Operation:</Label>
      <Select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">Add (+)</option>
        <option value="subtract">Subtract (-)</option>
        <option value="multiply">Multiply (×)</option>
        <option value="divide">Divide (÷)</option>
      </Select>
    </MathNodeWrapper>
  );
};
