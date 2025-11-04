// filterNode.js
import React, { useState } from "react";
import styled from "styled-components";
import { BaseNode, InputField, Label } from "../components/BaseNode";

const FilterNodeWrapper = styled(BaseNode)`
  min-width: 250px;
`;

const Condition = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "");

  const inputs = [{ id: "input", label: "Input Data" }];

  const outputs = [{ id: "filtered", label: "Filtered Data" }];

  return (
    <FilterNodeWrapper
      id={id}
      title="Filter"
      inputs={inputs}
      outputs={outputs}
      data={data}
    >
      <Condition>
        <Label>Filter Condition:</Label>
        <InputField
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="x => x > 0"
        />
      </Condition>
    </FilterNodeWrapper>
  );
};
