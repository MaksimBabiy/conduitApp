import React from "react";
import { Link } from "react-router-dom";
import FavourityBtn from "./FavourityBtn";
import TagList from "./TagList";
import { ArticleType } from "../types";
import ArticleUserInfo from "./ArticleUserInfo";
type Props = {
  article?: ArticleType;
};

const Article: React.FC<Props> = ({ article }) => {
  return (
    <div className="flex w-auto h-auto flex-col mb-10">
      <div className="flex justify-between items-center mb-4">
        <ArticleUserInfo author={article?.author} date={article?.createdAt} />
        <FavourityBtn text={article?.favoritesCount as number} />
      </div>
      <div>
        <Link
          to={`/articles/${article?.slug}`}
          className="font-semibold text-2xl mb-1 text-justify text-black hover:no-underline hover:text-black"
        >
          {article?.title}
        </Link>
        <p className="text-theme-darkenGray font-light mb-1 text-justify">
          {article?.description}
        </p>
        <div className="flex justify-between">
          {" "}
          <p className="mt-2 text-gray-200 cursor-pointer text-sm">
            Read more...
          </p>
          <TagList taglist={article?.tagList as string[]} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Article;
