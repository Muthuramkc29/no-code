const Root = ({ children }) => {
  return (
    <div
      className="
          transition-colors
          transition-opacity
          transition-shadow
          transition-border
          duration-200
          p-0
          m-0
          rounded-[6px]
          relative
          border-box
          border-[1px]
          border-pipelinenodeborder-selected
          shadow-[0px_0px_0px_4px_#9b9ce0] hover:shadow-[0px_0px_0px_4px_#9b9ce0]
          bg-[#ffffff]

          "
      style={{ height: "auto", width: 400 }}
    >
      {children}
    </div>
  );
};

const Info = ({ icon, title, description, children }) => {
  return (
    <div className="flex flex-col gap-2 pl-4 py-3 m-3 bg-indigo-1 rounded-md border border-[rgb(165_180_252)]">
      <div
        className="
          flex
          items-center
          gap-4
          justify-between
          relative
          text-[#6563e4]
        "
      >
        <div className="flex items-center gap-3">
          <div>{icon ? icon : null}</div>
          <div className="text-inherit font-medium text-2xl">{title}</div>
        </div>
      </div>
      <div className="!text-[rgb(40_42_52)] text-base pr-4 ">{description}</div>

      {children && children}
    </div>
  );
};

const Body = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 gap-3 relative px-[18px] pt-2 pb-4 w-full">
      {children}
    </div>
  );
};

const Chip = ({ children }) => {
  return (
    <div
      className="
                inline-block
                px-3
                py-2
                bg-[#DEDFF5]
                min-w-[40px]
                text-center
                text-xl
                w-full
                text-[#6563e4]
              cursor-pointer w-full rounded-md overflow-hidden text-ellipsis"
    >
      {children}
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder }) => {
  return (
    <div
      className="relative w-full nodrag h-full flex flex-col gap-2 my-2"
      translate="no"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="flex flexitems-center vs-gap-4">
            <div className="vs-text-typography-secondary-text break-all min-w-0 transition-all text-xl font-semibold cursor-text !vs-text-[#565C65] vs-text-semi-20">
              {label}
            </div>
            <p className="text-[#df1b41]">*</p>
          </label>
        </div>
      </div>
      <div
        className="flex flex-row w-full items-center h-full relative cursor-text"
        translate="no"
      >
        <input
          className="w-full border border-[rgb(173_172_176)] rounded-md px-3 py-2 text-xl focus:outline-none focus:border-[#625afa]"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="relative w-full nodrag h-full flex flex-col gap-2 my-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="flex flexitems-center vs-gap-4">
            <div className="vs-text-typography-secondary-text break-all min-w-0 transition-all text-xl font-semibold cursor-text !vs-text-[#565C65] vs-text-semi-20">
              {label}
            </div>
            <p className="text-[#df1b41]">*</p>
          </label>
        </div>
      </div>
      <div
        className="flex flex-row w-full items-center h-full relative cursor-text w-full border border-[rgb(173_172_176)] rounded-md px-3 py-2 text-xl focus:outline-none focus:border-[#625afa]"
        translate="no"
      >
        <select
          className="w-full outline-none"
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { Root, Info, Body, Chip, InputField, Dropdown };
