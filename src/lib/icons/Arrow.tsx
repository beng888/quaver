import { MouseEventHandler } from "react";

interface Props {
  strokeWidth?: number;
  stroke?: string;
  shadow?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
}

const Arrow: React.FC<Props> = ({
  strokeWidth,
  stroke,
  shadow = false,
  onClick,
  className,
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
      <path
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        d="M60 70 L85 50 L60 30"
      />
      <path
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        d="M15 50 H85"
      />
    </svg>
  );
};

export default Arrow;
