import PipelineToolbar from "./components/toolbar";
import PipelineUI from "./components/pipeline-ui";
import Header from "./components/header";
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col flex-1 overflow-hidden m-2 bg-quaternary border border-primary rounded-lg shadow-xs relative z-20 m-2">
        <Header />
        <PipelineToolbar />
        <PipelineUI />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
