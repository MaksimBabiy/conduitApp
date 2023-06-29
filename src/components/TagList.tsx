import React from "react";
import TagItem from "./TagItem";

type Props = {
  taglist: string[] | "";
  classname?: string;
  forEdit?: boolean;
  handleRemoveTag?: (e: string) => void;
};

const TagList: React.FC<Props> = ({
  taglist,
  classname,
  forEdit,
  handleRemoveTag,
}) => {
  return (
    <ul className={`flex ${classname}`}>
      {taglist &&
        taglist?.map((item: string, index: number) => (
          <TagItem
            text={item}
            key={index}
            forEdit={forEdit}
            handleRemoveTag={handleRemoveTag}
          />
        ))}
    </ul>
  );
};

export default TagList;
