import { useGetArticleCommentsQuery } from "../store/api/api.store";
import { Link, useLocation } from "react-router-dom";
import ArticleCommend from "./ArticleCommend";
import { useAuthUser } from "../hooks/useAuthUser";
import CreateCommend from "./CreateCommend";

type Props = {};

const CommentsList = (props: Props) => {
  const { pathname } = useLocation();
  const { data: commentsData } = useGetArticleCommentsQuery(
    pathname.split(`/articles/`)[1]
  );
  console.log(commentsData);
  const { isLogged } = useAuthUser();
  return (
    <div className="flex flex-col justify-center items-center">
      {!isLogged && (
        <p className="text-center mb-2">
          <Link to={"/sign-in"}>Sign in</Link> or{" "}
          <Link to={"/sign-up"}>sign up</Link> to add comments on this article.
        </p>
      )}
      {(commentsData?.comments.length as number) < 1 && (
        <p className="text-center mb-5">Немає жодного коментаря</p>
      )}
      <CreateCommend slug={pathname.split(`/articles/`)[1]} />
      {commentsData?.comments.map((item, index) => (
        <ArticleCommend comment={item} key={index} />
      ))}
    </div>
  );
};

export default CommentsList;
