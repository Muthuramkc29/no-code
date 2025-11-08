export const InputSVG = ({ size = "24" }) => {
  return (
    <svg
      {...(size && { width: size, height: size })}
      fill="currentColor"
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium size-6 group-hover:text-indigo-600 css-vubbuv"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="InputIcon"
    >
      <path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2M11 16l4-4-4-4v3H1v2h10z"></path>
    </svg>
  );
};
