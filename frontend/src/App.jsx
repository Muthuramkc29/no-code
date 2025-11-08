import { PipelineToolbar } from "./components/toolbar";
import { PipelineUI } from "./components/pipeline-ui";
import { SubmitButton } from "./components/submit-button";
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <ReactFlowProvider>
      <div>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
