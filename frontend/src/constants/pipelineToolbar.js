import { NODE_TYPES } from "./nodeTypes";

const { INPUT, LLM, OUTPUT, TEXT } = NODE_TYPES;

export const TOOLBAR = {
  basic: {
    [INPUT]: {
      type: "customInput",
      label: "Input",
      icon: "InputSVG",
    },
    [LLM]: {
      type: "llm",
      label: "LLM",
      icon: "LlmSVG",
    },
    [OUTPUT]: {
      type: "customOutput",
      label: "Output",
      icon: "OutputSVG",
    },
    [TEXT]: {
      type: "text",
      label: "Text",
      icon: "TextSVG",
    },
  },
};
