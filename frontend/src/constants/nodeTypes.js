import {
  InputSVG,
  LlmSVG,
  OutputSVG,
  TextSVG,
  DataCollectorSVG,
} from "../icons";

export const NODE_TYPES = {
  TEXT: "TEXT",
  LLM: "LLM",
  INPUT: "INPUT",
  OUTPUT: "OUTPUT",
  DATA_COLLECTOR: "DATA_COLLECTOR",
};

const { INPUT, LLM, OUTPUT, TEXT, DATA_COLLECTOR } = NODE_TYPES;

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
  [DATA_COLLECTOR]: {
    type: "data_collector",
    label: "Data Collector",
    icon: DataCollectorSVG,
  },
};
