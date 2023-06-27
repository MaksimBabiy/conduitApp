import ArticleUserInfo from "./ArticleUserInfo";

import { ArticleType } from "../types";
import FavourityBtn from "./FavourityBtn";

type Props = {
  article: ArticleType;
  isMyArticle?: boolean;
};

const ArticleMeta = (props: Props) => {
  return (
    <div className="flex items-center ">
      <div className="mr-5">
        <ArticleUserInfo
          author={props.article.author}
          date={props.article.createdAt}
        />
      </div>
      {!props.isMyArticle && (
        <FavourityBtn
          type="ProfileFollowBtn"
          isFollowing={props.article.author.following}
          username={props.article.author.username}
          classname="text-gray-400 hover:bg-gray-200 border text-center flex justify-center items-center ml-2  p-1 cursor-pointer text-sm rounded-sm"
        />
      )}

      <FavourityBtn
        slug={props.article.slug}
        isFavorited={props.article.favorited}
        type="ArticlePageFavBtn"
        count={props.article.favoritesCount}
      />
    </div>
  );
};

export default ArticleMeta;
