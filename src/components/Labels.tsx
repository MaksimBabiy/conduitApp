import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectTag } from "../store/slices/feed.slice";

type AdditionalItem = {
  value: string;
  to: string;
};

type Props = {
  defaultValue: string;
  defaultLink: string;
  additionalItem?: AdditionalItem[];
};

const Labels = (props: Props) => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const currentTag = useAppSelector((state) => state.feed.selectedTag);
  const dispatch = useAppDispatch();

  return (
    <ul className="mb-4 ">
      <Link
        to={props.defaultLink}
        onClick={() => dispatch(selectTag(props.defaultValue))}
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
            to={`${c.to}`}
            onClick={() => dispatch(selectTag(c.value))}
            className={`text-theme-green px-2 py-2 inline-block cursor-pointer text-lg ${
              currentTag === `${c.value}` && `active`
            } hover:no-underline`}
          >
            {c.value}
          </Link>
        ))}
      {tag && (
        <li
          onClick={() => dispatch(selectTag(tag))}
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
