import React from "react";
import TagItem from "./TagItem";
import { useGetGlobalTagsQuery } from "../store/api/api.store";
import { useAppDispatch } from "../store/store";
import { selectTag } from "../store/slices/feed.slice";
import { SetURLSearchParams } from "react-router-dom";

type Props = {
  setSearchParams: SetURLSearchParams;
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
};

const PopularTags = (props: Props) => {
  const { data, isError } = useGetGlobalTagsQuery();
  const dispach = useAppDispatch();
  const HandleClick = (e: string) => {
    props.setItemOffset(0);
    dispach(selectTag(e));
  };
  if (isError) {
    return <h1>smth wents wrong...</h1>;
  }
  return (
    <div className="bg-gray-200 w-auto h-auto p-4 ">
      <h2 className="mb-1">Popular Tags</h2>
      <ul className="flex flex-wrap">
        {data?.tags.map((item: string, index: number) => (
          <TagItem
            text={item}
            bg
            color="white"
            as="a"
            key={index}
            onClickHandler={HandleClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default PopularTags;
