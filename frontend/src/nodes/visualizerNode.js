// visualizerNode.js
import React, { useState } from "react";
import styled from "styled-components";
import { BaseNode, Label } from "../components/BaseNode";

const VisualizerNodeWrapper = styled(BaseNode)`
  min-width: 300px;
`;

const Select = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;

const PreviewArea = styled.div`
  width: 100%;
  height: 150px;
  border: 1px dashed ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text};
`;

export const VisualizerNode = ({ id, data }) => {
  const [chartType, setChartType] = useState(data?.chartType || "bar");

  const inputs = [{ id: "data", label: "Input Data" }];

  return (
    <VisualizerNodeWrapper
      id={id}
      title="Data Visualizer"
      inputs={inputs}
      data={data}
    >
      <Label>Chart Type:</Label>
      <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="scatter">Scatter Plot</option>
      </Select>
      <PreviewArea>Preview Area</PreviewArea>
    </VisualizerNodeWrapper>
  );
};
