import React, { ComponentProps } from "react";

type Props = {
  children: React.ReactNode;
  type?: ComponentProps<"button">["type"];
  disabled?: ComponentProps<"button">["disabled"];
  onClick?: ComponentProps<"button">["onClick"];
};

const Btn = ({ children, onClick, ...buttonProps }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-theme-green text-white py-3 px-5 rounded-md text-xl hover:bg-green-600 active:bg-theme-green/80"
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Btn;
