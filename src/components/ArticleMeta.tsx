import ArticleUserInfo from "./ArticleUserInfo";
import { ArticleType } from "../types";
import CustomBtn from "./CustomBtn";
import { AiFillHeart, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import {
  useDeleteArticleMutation,
  useFavorityArticleMutation,
  useFollowUserMutation,
  useUnFavorityArticleMutation,
  useUnFollowUserMutation,
  useUpdateArticleMutation,
} from "../store/api/api.store";
import { useAuthUser } from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { toast } from "react-toastify";
import { ImBin } from "react-icons/im";

type Props = {
  article: ArticleType;
  isMyArticle?: boolean;
};

const ArticleMeta = (props: Props) => {
  const [useFavority] = useFavorityArticleMutation();
  const [useUnFavority] = useUnFavorityArticleMutation();
  const [useFollow] = useFollowUserMutation();
  const [useUnFollow] = useUnFollowUserMutation();
  const [useDeleteArticle] = useDeleteArticleMutation();
  const [useUpdateArticle] = useUpdateArticleMutation();
  const { isLogged } = useAuthUser();
  const navigate = useNavigate();

  const HandleFavorite = async () => {
    await useFavority(props.article.slug);
    toast.success(`You liked article`);
  };
  const UnHandleFavorite = async () => {
    await useUnFavority(props.article.slug);
    toast.warning(`You unliked article`);
  };
  const FollowUser = async () => {
    await useFollow(props.article.author.username);
    toast.info(`You followed ${props.article.author.username}`);
  };
  const UnFollowUser = async () => {
    await useUnFollow(props.article.author.username as string);
    toast.warning(`You unfollowed ${props.article.author.username}`);
  };
  const DeleteArticle = async () => {
    await useDeleteArticle(props.article.slug)
      .unwrap()
      .then((data) => {
        toast.success("Your article deleted");
        navigate("/");
      })
      .catch((err) => toast.success("Your article not deleted"));
  };

  return (
    <div className="flex items-center ">
      <div className="mr-5">
        <ArticleUserInfo
          author={props.article.author}
          date={props.article.createdAt}
        />
      </div>
      {!props.isMyArticle ? (
        <>
          <CustomBtn
            type="ProfileFollowBtn"
            isFollowing={props.article.author.following}
            onClick={() =>
              isLogged
                ? !props.article.author.following
                  ? FollowUser()
                  : UnFollowUser()
                : navigate(routes.signIn.path)
            }
          >
            <AiOutlinePlus className="mr-1" />{" "}
            {props.article.author.following
              ? `UnFollow ${props.article.author.username}`
              : `Follow ${props.article.author.username}`}
          </CustomBtn>
          <CustomBtn
            type="ArticlePageFavBtn"
            isFavorited={props.article.favorited}
            onClick={() =>
              isLogged
                ? !props.article.favorited
                  ? HandleFavorite()
                  : UnHandleFavorite()
                : navigate(routes.signIn.path)
            }
          >
            <AiFillHeart className="mr-1" />
            <p className="text-sm ">
              Favorite Article ({props.article.favoritesCount})
            </p>
          </CustomBtn>
        </>
      ) : (
        <>
          <CustomBtn
            type="ArticleEditBtn"
            isFollowing={props.article.author.following}
            onClick={() => navigate(`/editor/${props.article.slug}`)}
          >
            <AiOutlineEdit className="mr-1" /> Edit Article
          </CustomBtn>
          <CustomBtn type="ArticleDeleteBtn" onClick={() => DeleteArticle()}>
            <ImBin className="mr-1" /> Delete Article
          </CustomBtn>
        </>
      )}
    </div>
  );
};

export default ArticleMeta;
