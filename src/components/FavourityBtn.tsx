import React from "react";
import { AiFillHeart } from "react-icons/ai";

type Props = {
  text: number;
};

const FavourityBtn: React.FC<Props> = ({ text }) => {
  return (
    <div className="border border-theme-green w-a h-auto px-2 py-1 text-theme-green hover:cursor-pointer flex items-center justify-center align-middle rounded-sm group hover:bg-theme-green focus:bg-theme-darkGreen">
      <AiFillHeart color="#5CB85C" className="group-hover:fill-white" />
      <p className="text-base group-hover:text-white">{text}</p>
    </div>
  );
};

export default FavourityBtn;
