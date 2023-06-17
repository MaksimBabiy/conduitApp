import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className={`w-[45%] m-auto`}>{children}</div>;
};

export default Container;
