import { useGetArticleCommentsQuery } from "../store/api/api.store";
import { Link, useLocation } from "react-router-dom";
import ArticleCommend from "./ArticleCommend";
import { useAuthUser } from "../hooks/useAuthUser";

type Props = {};

const CommentsList = (props: Props) => {
  const { pathname } = useLocation();
  const { data: commentsData } = useGetArticleCommentsQuery(
    pathname.split(`/articles/`)[1]
  );
  const { isLogged } = useAuthUser();
  return (
    <div>
      {!isLogged && (
        <p className="text-center mb-2">
          <Link to={"/sign-in"}>Sign in</Link> or{" "}
          <Link to={"/sign-up"}>sign up</Link> to add comments on this article.
        </p>
      )}
      {(commentsData?.comments.length as number) < 1 && (
        <p className="text-center">Немає жодного коментаря</p>
      )}
      {commentsData?.comments.map((item) => (
        <ArticleCommend comment={item} />
      ))}
    </div>
  );
};

export default CommentsList;
