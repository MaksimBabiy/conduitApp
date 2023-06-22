import { Link, SetURLSearchParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectTag } from "../store/slices/feed.slice";
import { seroalizeSearchParams } from "./utils/router";
import { useEffect } from "react";

type AdditionalItem = {
  value: string;
  to: string;
};

type Props = {
  defaultValue: string;
  defaultLink: string;
  additionalItem?: AdditionalItem[];
  setItemOffset?: React.Dispatch<React.SetStateAction<number>>;
};

const Labels = (props: Props) => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const currentTag = useAppSelector((state) => state.feed.selectedTag);
  const dispatch = useAppDispatch();

  const handleClick = (nametag: string) => {
    dispatch(selectTag(nametag));
    props.setItemOffset && props.setItemOffset(0);
  };

  return (
    <ul className="mb-4 ">
      <Link
        to={`${props.defaultLink}?page=0`}
        onClick={() => handleClick(props.defaultValue)}
        className={`text-theme-green px-2 py-2 inline-block cursor-pointer text-lg ${
          currentTag === `${props.defaultValue}` && `active`
        } hover:no-underline`}
      >
        {props.defaultValue}
      </Link>
      {props.additionalItem &&
        props.additionalItem.map((c: AdditionalItem, index: number) => (
          <Link
            key={index}
            to={`${c.to}?page=0`}
            onClick={() => handleClick(c.value)}
            className={`text-theme-green px-2 py-2 inline-block cursor-pointer text-lg ${
              currentTag === `${c.value}` && `active`
            } hover:no-underline`}
          >
            {c.value}
          </Link>
        ))}
      {tag && (
        <li
          onClick={() => handleClick(tag)}
          className={`text-theme-green px-2 py-2 inline-block cursor-pointer text-lg ${
            currentTag === tag && `active`
          }`}
        >
          # {tag}
        </li>
      )}
      <hr />
    </ul>
  );
};

export default Labels;
