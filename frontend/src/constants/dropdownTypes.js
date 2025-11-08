export const dropdownTypes = {
  TEXT: {
    label: "Text",
    value: "text",
  },
  INTEGER: {
    label: "Integer",
    value: "integer",
  },
};

export const dropdownTypeOptions = Object.values(dropdownTypes).map((type) => ({
  label: type.label,
  value: type.value,
}));
