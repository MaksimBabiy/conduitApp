import ArticleUserInfo from "./ArticleUserInfo";
import { Comment } from "../types";
import CustomBtn from "./CustomBtn";
import { useAppSelector } from "../store/store";
import { useDeleteCommentMutation } from "../store/api/api.store";
import { toast } from "react-toastify";

type Props = {
  comment: Comment;
  slug: string;
};

const ArticleCommend = (props: Props) => {
  const userData = useAppSelector((state) => state.auth.userData);
  const [useDeleteComment] = useDeleteCommentMutation();
  const HandleDelete = async () => {
    await useDeleteComment({ slug: props.slug, id: props.comment.id })
      .unwrap()
      .then(() => toast.success("Comment was deleted"))
      .catch(() => toast.error("Comment wasn't deleted"));
  };
  return (
    <div className="border rounded-md mb-5 w-[550px]">
      <div className="p-5 text-justify">{props.comment.body}</div>
      <div className="px-5 py-3 border-t bg-theme-pageHoverBg flex justify-between items-center">
        <ArticleUserInfo
          iscommend={true}
          author={props.comment.author}
          date={props.comment.createdAt}
        />
        {props.comment.author.username === userData?.username && (
          <CustomBtn type="ArticleDeleteBtn" onClick={() => HandleDelete()}>
            Delete Comment
          </CustomBtn>
        )}
      </div>
    </div>
  );
};

export default ArticleCommend;
