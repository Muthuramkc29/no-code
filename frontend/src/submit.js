// submit.js
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "./styles/theme";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
`;

const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  &:disabled {
    background-color: ${theme.colors.border};
    cursor: not-allowed;
  }
`;

const Alert = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: ${theme.spacing.md};
  background-color: ${(props) =>
    props.error ? theme.colors.error : theme.colors.success};
  color: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.default};
  z-index: 1000;
  max-width: 300px;
`;

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const showAlert = (message, isError = false) => {
    setAlert({ message, isError });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // nodes and edges are already available from useStore

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze pipeline");
      }

      const data = await response.json();
      const message = `Pipeline Analysis:
                • Number of Nodes: ${data.num_nodes}
                • Number of Edges: ${data.num_edges}
                • Is DAG: ${data.is_dag ? "Yes" : "No"}`;

      showAlert(message);
    } catch (error) {
      showAlert(error.message, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubmitButtonContainer>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Analyzing..." : "Submit Pipeline"}
        </Button>
      </SubmitButtonContainer>
      {alert && <Alert error={alert.isError}>{alert.message}</Alert>}
    </>
  );
};
