import ArticleUserInfo from "./ArticleUserInfo";
import FollowBtn from "./FollowBtn";
import FavoriteBtn from "./FavoriteBtn";
import { ArticleType } from "../types";

type Props = {
  article: ArticleType;
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
      <FollowBtn
        username={props.article.author.username}
        classname="text-gray-400 hover:bg-gray-200 border text-center flex justify-center items-center ml-2  p-1 cursor-pointer text-sm rounded-sm"
      />
      <FavoriteBtn count={props.article.favoritesCount} />
    </div>
  );
};

export default ArticleMeta;
