import { MouseEventHandler } from "react";

const viewBox = {
  phone: "0 0 32 32",
  mail: "0 0 32 32",
  fb: "0 0 32 32",
  home: "0 0 32 32",
  default: "0 0 100 100",
};

const types = {
  arrow: (
    <>
      <path fill="none" d="M60 70 L85 50 L60 30" />
      <path fill="none" d="M15 50 H85" />
    </>
  ),
  phone: (
    <>
      <path d="M11.748 5.773S11.418 5 10.914 5c-.496 0-.754.229-.926.387S6.938 7.91 6.938 7.91s-.837.731-.773 2.106c.054 1.375.323 3.332 1.719 6.058 1.386 2.72 4.855 6.876 7.047 8.337 0 0 2.031 1.558 3.921 2.191.549.173 1.647.398 1.903.398.26 0 .719 0 1.246-.385.536-.389 3.543-2.807 3.543-2.807s.736-.665-.119-1.438c-.859-.773-3.467-2.492-4.025-2.944-.559-.459-1.355-.257-1.699.054-.343.313-.956.828-1.031.893-.112.086-.419.365-.763.226-.438-.173-2.234-1.148-3.899-3.426-1.655-2.276-1.837-3.02-2.084-3.824a.56.56 0 0 1 .225-.657c.248-.172 1.161-.933 1.161-.933s.591-.583.344-1.27-1.906-4.716-1.906-4.716z" />
    </>
  ),
  mail: (
    <>
      <path d="M5 24.225V7.776h22v16.447H5v.002zm3.011-1.815h15.978l-5.111-5.115L16 20.179l-2.877-2.883-5.112 5.114zm-1.216-1.275l5.077-5.09-5.077-5.065v10.155zm13.332-5.09l5.079 5.09V10.979l-5.079 5.066zm-4.126 1.588l8.022-8.027-16.045-.001 8.023 8.028z" />{" "}
    </>
  ),
  fb: (
    <>
      <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z" />
    </>
  ),

  home: (
    <>
      <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z" />{" "}
    </>
  ),
};

interface Props {
  type: string;
  strokeWidth?: number;
  stroke?: string;
  shadow?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
}

const Icon: React.FC<Props> = ({
  strokeWidth,
  stroke,
  shadow = false,
  onClick,
  className,
  type,
}) => {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox[type] || viewBox.default}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        filter: `${shadow ? "drop-shadow( 0px 0px 1px rgba(0, 0, 0, .7)" : ""}`,
      }}
    >
      <g stroke={stroke} strokeWidth={strokeWidth} fill="currentColor">
        {types[type]}
      </g>
    </svg>
  );
};

export default Icon;
