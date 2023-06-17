import React from "react";
import TagItem from "./TagItem";

type Props = {
  taglist: string[];
  classname?: string;
};

const TagList: React.FC<Props> = ({ taglist, classname }) => {
  return (
    <ul className={`flex ${classname}`}>
      {taglist?.map((item: string, index: number) => (
        <TagItem text={item} key={index} />
      ))}
    </ul>
  );
};

export default TagList;
