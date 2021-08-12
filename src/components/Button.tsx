import React from "react";

interface Props {
  cls?: string;
}

export const Button: React.FC<Props> = ({ cls, children }) => {
  return (
    <button
      className={`bg-secondary py-3 px-6 rounded-md text-white relative overflow-hidden group ${cls}`}
    >
      {children}
      <div className="absolute inset-0 duration-500 transform scale-x-0 bg-white bg-opacity-20 group-hover:scale-x-100" />
    </button>
  );
};

export default Button;
