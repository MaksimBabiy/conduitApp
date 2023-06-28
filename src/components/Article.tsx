import React from "react";
import { Link, useNavigate } from "react-router-dom";

import TagList from "./TagList";
import { ArticleType } from "../types";
import ArticleUserInfo from "./ArticleUserInfo";
import CustomBtn from "./CustomBtn";
import { AiFillHeart } from "react-icons/ai";
import {
  useFavorityArticleMutation,
  useUnFavorityArticleMutation,
} from "../store/api/api.store";
import { toast } from "react-toastify";
import { routes } from "../routes";
import { useAuthUser } from "../hooks/useAuthUser";

type Props = {
  article?: ArticleType;
};

const Article: React.FC<Props> = ({ article }) => {
  const [useFavority] = useFavorityArticleMutation();
  const [useUnFavority] = useUnFavorityArticleMutation();
  const { isLogged } = useAuthUser();
  const navigate = useNavigate();
  const HandleFavorite = async () => {
    await useFavority(article?.slug as string);
    toast.success(`You liked article`);
  };
  const UnHandleFavorite = async () => {
    await useUnFavority(article?.slug as string);
    toast.warning(`You unliked article`);
  };

  return (
    <div className="flex w-auto h-auto flex-col mb-10">
      <div className="flex justify-between items-center mb-4">
        <ArticleUserInfo author={article?.author} date={article?.createdAt} />
        <CustomBtn
          isFavorited={article?.favorited}
          type="ArticleFavBtn"
          onClick={() =>
            isLogged
              ? !article?.favorited
                ? HandleFavorite()
                : UnHandleFavorite()
              : navigate(routes.signIn.path)
          }
        >
          {" "}
          <AiFillHeart
            color="#5CB85C"
            className={`group-hover:fill-white ${
              article?.favorited && `fill-white`
            }`}
          />
          <p className="text-base group-hover:text-white">
            {article?.favoritesCount}
          </p>
        </CustomBtn>
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
