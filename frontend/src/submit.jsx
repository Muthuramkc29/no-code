// submit.js
import React, { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

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
      <div className="flex items-center justify-center p-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-[rgb(99_102_241)] text-[rgb(250_250_255)] border-none px-4 py-2 rounded-md cursor-pointer font-semibold transition-colors duration-200 
            ${
              loading ? "bg-gray-200 cursor-not-allowed" : "hover:bg-secondary"
            }`}
        >
          {loading ? "Analyzing..." : "Submit Pipeline"}
        </button>
      </div>
      {alert && (
        <div
          className={`fixed top-5 right-5 p-5 rounded-lg shadow-lg z-[1000] max-w-[380px]
            ${
              alert.isError
                ? "bg-red-50 text-red-800 border-l-4 border-red-500"
                : "bg-green-50 text-green-800 border-l-4 border-green-500"
            }
            transform transition-all duration-500 ease-in-out
            animate-[fadeIn_0.3s_ease-in-out]
            hover:translate-x-[-5px]
            flex flex-col gap-2`}
        >
          <div className="flex items-start justify-between">
            <span className="font-medium">
              {alert.isError ? "Error" : "Success"}
            </span>
            <button
              onClick={() => setAlert(null)}
              className={`ml-4 hover:opacity-70 transition-opacity ${
                alert.isError ? "text-red-600" : "text-green-600"
              }`}
            >
              ×
            </button>
          </div>
          <p className="text-sm whitespace-pre-line leading-relaxed opacity-90">
            {alert.message}
          </p>
        </div>
      )}
    </>
  );
};
