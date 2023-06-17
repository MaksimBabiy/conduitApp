import React from "react";
import { Author } from "../types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { selectTag, selectUser } from "../store/slices/feed.slice";
import { DateTime } from "luxon";

type Props = {
  author?: Author;
  iscommend?: boolean;
  date?: string;
};

const ArticleUserInfo = ({ author, iscommend, date }: Props) => {
  const dispatch = useAppDispatch();

  const handleLink = (user: string) => {
    dispatch(selectTag("My Articles"));
    dispatch(selectUser(user));
  };
  return !iscommend ? (
    <div className="flex">
      <Link
        to={`/@${author?.username}/`}
        onClick={() => handleLink(author?.username!)}
      >
        <img
          src={author?.image}
          alt={author?.username}
          className="w-[40px] h-[40px] rounded-full mr-2"
        />
      </Link>
      <div className="inline-flex flex-col leading-3 justify-center">
        <Link
          to={`/@${author?.username}/`}
          onClick={() => handleLink(author?.username!)}
        >
          <p className="text-center text-theme-green font-bold ">
            {author?.username}
          </p>
        </Link>

        <p className="text-theme-gray text-sm">
          {DateTime.fromISO(date as string).toLocaleString(DateTime.DATE_FULL)}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex">
      <Link
        to={`/profile?author=${author?.username}`}
        onClick={() => handleLink(author?.username!)}
      >
        <img
          src={author?.image}
          alt={author?.username}
          className="w-[20px] h-[20px] rounded-full mr-2"
        />
      </Link>
      <div className=" flex leading-3 justify-center">
        <Link
          to={`/profile?author=${author?.username}`}
          onClick={() => handleLink(author?.username!)}
          className="mr-3"
        >
          <p className="text-center text-theme-green  text-sm opacity-80">
            {author?.username}
          </p>
        </Link>
        <p className="text-theme-gray text-sm">
          {DateTime.fromISO(date as string).toLocaleString(DateTime.DATE_FULL)}
        </p>
      </div>
    </div>
  );
};

export default ArticleUserInfo;
