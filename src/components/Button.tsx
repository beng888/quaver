import React from "react";

interface Props {
  cls?: string;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({ cls, disabled, children }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-secondary py-1 px-2 text-sm md:text-base md:py-3 md:px-6 duration-500 rounded-md text-white relative overflow-hidden group ${cls}`}
    >
      {children}
      {!disabled && (
        <div className="absolute inset-0 duration-500 transform scale-x-0 bg-white bg-opacity-20 group-hover:scale-x-100" />
      )}
    </button>
  );
};

export default Button;
