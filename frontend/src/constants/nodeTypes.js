export const NODE_TYPES = {
  TEXT: "TEXT",
  LLM: "LLM",
  INPUT: "CUSTOM_INPUT",
  OUTPUT: "CUSTOM_OUTPUT",
};

const { INPUT, LLM, OUTPUT, TEXT } = NODE_TYPES;

export const NODE_TYPES_META = {
  [TEXT]: {
    type: "text",
    label: "Text",
    icon: "TextSVG",
  },
  [LLM]: {
    type: "llm",
    label: "LLM",
    icon: "LlmSVG",
  },
  [INPUT]: {
    type: "customInput",
    label: "Input",
    icon: "InputSVG",
  },
  [OUTPUT]: {
    type: "customOutput",
    label: "Output",
    icon: "OutputSVG",
  },
};
