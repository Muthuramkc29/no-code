import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Editor, Transforms, Range, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  Slate,
  useFocused,
  useSelected,
  withReact,
} from "slate-react";
import { useStore } from "../../../store";
import { shallow } from "zustand/shallow";

const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const IS_MAC =
  typeof navigator !== "undefined" && /Mac OS X/.test(navigator.userAgent);

const selector = (state) => ({
  nodes: state.nodes,
  addEdge: state.addEdge,
});

const RichEditor = ({ value, onChange, placeholder }) => {
  const { nodes, addEdge } = useStore(selector, shallow);
  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const editor = useMemo(
    () => withVariables(withReact(withHistory(createEditor()))),
    []
  );

  const VARIABLES = nodes
    .map((node) => node.id)
    .filter((id) => !id.startsWith("text"));

  const variables = VARIABLES.filter((v) =>
    v.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  const connectTextNodeToLLM = () => {
    addEdge({
      source: "llm-1",
      sourceHandle: "llm-1-response",
      target: "text-1",
      targetHandle: "text-1-text",
      type: "smoothstep",
      animated: true,
      markerEnd: {
        type: "arrow",
        height: "20px",
        width: "20px",
      },
      id: "reactflow__edge-llm-1llm-1-response-text-1text-1-text",
    });
  };

  const connectEdges = () => {
    // TODO: Add dynamic edge connections support by getting node's metadata
    connectTextNodeToLLM();
  };

  const onKeyDown = useCallback(
    (event) => {
      if (target && variables.length > 0) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setIndex((index + 1) % variables.length);
            break;
          case "ArrowUp":
            event.preventDefault();
            setIndex((index - 1 + variables.length) % variables.length);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertVariable(editor, variables[index], connectEdges);
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [variables, editor, index, target]
  );

  useEffect(() => {
    if (target && variables.length > 0 && ref.current) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [variables.length, editor, index, search, target]);

  const handleChange = () => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);

      // 🔹 Look back a few characters, not just a word
      const before = Editor.before(editor, start, { distance: 10 }); // look 10 chars back
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);

      // 🔹 Match {{
      const beforeMatch = beforeText && beforeText.match(/\{\{(\w*)$/);

      if (beforeMatch) {
        setTarget(beforeRange);
        setSearch(beforeMatch[1]);
        setIndex(0);
        return;
      }
    }

    setTarget(null);
  };

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
      <Editable
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:border-blue-500"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Type {{ to insert a variable..."}
      />
      {target && variables.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{
              top: "-9999px",
              left: "-9999px",
              position: "absolute",
              zIndex: 1,
              padding: "3px",
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 5px rgba(0,0,0,.2)",
            }}
            data-cy="variable-portal"
          >
            {variables.map((variable, i) => (
              <div
                key={variable}
                onClick={(e) => {
                  Transforms.select(editor, target);
                  insertVariable(editor, variable, connectEdges);
                  setTarget(null);
                }}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  background: i === index ? "#E0E7FF" : "transparent",
                }}
              >
                {variable}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  );
};

// 🔹 Custom plugin for variables
const withVariables = (editor) => {
  const { isInline, isVoid, markableVoid } = editor;
  editor.isInline = (element) =>
    element.type === "variable" ? true : isInline(element);
  editor.isVoid = (element) =>
    element.type === "variable" ? true : isVoid(element);
  editor.markableVoid = (element) =>
    element.type === "variable" || markableVoid(element);
  return editor;
};

// 🔹 Inserts a variable element
const insertVariable = (editor, name, connectEdges) => {
  const variable = {
    type: "variable",
    name,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, variable);
  // Optional: insert closing braces after variable
  Transforms.insertText(editor, "}} ");
  Transforms.move(editor);
  connectEdges();
};

const Variable = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  const style = {
    padding: "2px 6px",
    margin: "0 1px",
    borderRadius: "4px",
    backgroundColor: "#E5E7EB",
    color: "#1E3A8A",
    fontWeight: 500,
    display: "inline-block",
    boxShadow: selected && focused ? "0 0 0 2px #93C5FD" : "none",
  };
  return (
    <span {...attributes} contentEditable={false} style={style}>
      {/* ✅ render curly braces as text, not objects */}
      {"{{"}
      {element.name}
      {"}}"}
      {children}
    </span>
  );
};

// 🔹 Element switcher
const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "variable":
      return <Variable {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.code) children = <code>{children}</code>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

// 🔹 Initial content
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default RichEditor;
