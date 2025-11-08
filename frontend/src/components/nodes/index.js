import { InputNode } from "./InputNode";
import { LLMNode } from "./LLMNode";
import { OutputNode } from "./OutputNode";
import { TextNode } from "./TextNode";

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};
