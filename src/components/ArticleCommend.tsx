import ArticleUserInfo from "./ArticleUserInfo";
import { Comment } from "../types";

type Props = {
  comment: Comment;
};

const ArticleCommend = (props: Props) => {
  return (
    <div className="border rounded-md mb-5">
      <div className="p-5 text-justify">{props.comment.body}</div>
      <div className="px-5 py-3 border-t bg-theme-pageHoverBg">
        <ArticleUserInfo
          iscommend={true}
          author={props.comment.author}
          date={props.comment.createdAt}
        />
      </div>
    </div>
  );
};

export default ArticleCommend;
