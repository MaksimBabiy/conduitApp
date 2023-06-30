import React, { ComponentProps, useEffect, useState } from "react";

type Props = {
  type:
    | "ArticleFavBtn"
    | "ProfileFollowBtn"
    | "ArticlePageFavBtn"
    | "ProfileEditBtn"
    | "ArticleEditBtn"
    | "ArticleDeleteBtn"
    | "CreateCommend";
  slug?: string;
  username?: string;
  classname?: string;
  count?: number;
  isFavorited?: boolean;
  isFollowing?: boolean;
  children: React.ReactNode;
  disabled?: ComponentProps<"button">["disabled"];
  icon?: React.ReactNode;
  onClick?: ComponentProps<"button">["onClick"];
};

const CustomBtn = (props: Props) => {
  const [className, setClassName] = useState("");
  useEffect(() => {
    if (props.type === "ArticleFavBtn") {
      setClassName(
        `border border-theme-green w-a h-auto px-2 py-1 text-theme-green hover:cursor-pointer flex items-center justify-center align-middle rounded-sm group hover:bg-theme-green focus:bg-theme-darkGreen ${
          props.isFavorited && `bg-theme-green text-white hover:bg-green-600`
        }`
      );
    } else if (props.type === "ProfileFollowBtn") {
      setClassName(
        ` hover:bg-blue-400 hover:text-white border border-blue-400 text-center flex justify-center items-center ml-2  p-1 cursor-pointer text-sm rounded-sm ${
          props.isFollowing
            ? `bg-blue-400  text-white hover:bg-blue-500`
            : `text-blue-400`
        }`
      );
    } else if (props.type === "ArticlePageFavBtn") {
      setClassName(
        `border-theme-green border text-center text-theme-green flex justify-center items-center ml-2 rounded-sm p-1 cursor-pointer hover:text-white ${
          !props.isFavorited && `hover:bg-theme-green`
        }  ${props.isFavorited && `bg-theme-green text-white `}`
      );
    } else if (props.type === "ProfileEditBtn") {
      setClassName(
        "border-gray-300 border-2 p-1 flex items-center text-gray-400 hover:bg-gray-300"
      );
    } else if (props.type === "ArticleEditBtn") {
      setClassName(
        "text-gray-400 hover:bg-gray-200 border text-center flex justify-center items-center ml-2  p-1 cursor-pointer text-sm rounded-sm"
      );
    } else if (props.type === "ArticleDeleteBtn") {
      setClassName(
        "text-red-500 hover:bg-red-500 border border-red-500 hover:text-white text-center flex justify-center items-center ml-2  p-1 cursor-pointer text-sm rounded-sm"
      );
    } else if (props.type === "CreateCommend") {
      setClassName(
        `text-theme-green bg-theme-green text-white border border-theme-green text-center flex justify-center items-center ml-2  p-1 cursor-pointer text-sm rounded-sm ${
          props.disabled
            ? `cursor-not-allowed bg-gray-600 border-gray-600 hover:bg-gray-700 `
            : ` hover:bg-green-600`
        } `
      );
    }
  }, [props]);
  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon}
      {props.children}
    </button>
  );
};

export default CustomBtn;
