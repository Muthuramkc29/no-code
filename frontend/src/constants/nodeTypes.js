import { InputSVG, LlmSVG, OutputSVG, TextSVG } from "../icons";

export const NODE_TYPES = {
  TEXT: "TEXT",
  LLM: "LLM",
  INPUT: "INPUT",
  OUTPUT: "OUTPUT",
};

const { INPUT, LLM, OUTPUT, TEXT } = NODE_TYPES;

export const NODE_TYPES_META = {
  [INPUT]: {
    type: "input",
    label: "Input",
    icon: InputSVG,
  },
  [LLM]: {
    type: "llm",
    label: "LLM",
    icon: LlmSVG,
  },
  [OUTPUT]: {
    type: "output",
    label: "Output",
    icon: OutputSVG,
  },
  [TEXT]: {
    type: "text",
    label: "Text",
    icon: TextSVG,
  },
};
