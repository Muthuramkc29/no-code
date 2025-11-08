import { InputNode } from "./InputNode";
import { LLMNode } from "./LLMNode";
import { OutputNode } from "./OutputNode";
import { TextNode } from "./TextNode";

export const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
  text: TextNode,
};
