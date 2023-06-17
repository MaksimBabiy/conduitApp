import React from "react";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  bg?: boolean;
  color?: string;
  as?: "li" | "a";
  onClickHandler?: (event: string) => void | undefined;
};

const TagItem = ({ text, bg, color, as = "li", onClickHandler }: Props) => {
  return as === "li" ? (
    <li
      className={` rounded-2xl border px-2 py-1 min-w-[40px] text-center text-sm mr-2 cursor-pointer mb-1 font-light 
      ${!bg && `hover:bg-gray-100`}
      ${bg && `bg-gray-500 hover:bg-gray-700`} 
      ${color ? `text-${color}` : `text-theme-darkenGray`} `}
    >
      {text}
    </li>
  ) : (
    <Link
      to={`/?tag=${text}`}
      onClick={() => onClickHandler && onClickHandler(text)}
      className={` rounded-2xl border px-2 py-1 min-w-[40px] hover:text-white hover:no-underline text-center text-sm mr-2 cursor-pointer mb-1 font-light 
      ${!bg && `hover:bg-gray-100`}
      ${bg && `bg-gray-500 hover:bg-gray-700`} 
      ${color ? `text-${color}` : `text-theme-darkenGray`} `}
    >
      {text}
    </Link>
  );
};

export default TagItem;
