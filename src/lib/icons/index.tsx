import { MouseEventHandler } from "react";

const types = {
  arrow: (
    <>
      <path fill="none" d="M60 70 L85 50 L60 30" />
      <path fill="none" d="M15 50 H85" />
    </>
  ),
  chevron: (
    <>
      <path fill="none" d="M25 90 L75 50 L25 10" />
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
      viewBox="0 0 100 100"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        filter: `${shadow ? "drop-shadow( 0px 0px 1px rgba(0, 0, 0, .7)" : ""}`,
      }}
    >
      <g stroke={stroke} strokeWidth={strokeWidth}>
        {types[type]}
      </g>
    </svg>
  );
};

export default Icon;
