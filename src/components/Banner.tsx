import React from "react";

type Props = {};

const Banner: React.FC = (props: Props) => {
  return (
    <div
      className="w-full bg-theme-green shadow-md h-auto flex justify-center flex-col
  items-center text-white "
    >
      <h1 className="text-6xl font-bold pt-7 pb-4 font-titillium drop-shadow-logo">
        conduit
      </h1>
      <p className="text-2xl pb-7 font-light">
        A place to share your knowledge.
      </p>
    </div>
  );
};

export default Banner;
