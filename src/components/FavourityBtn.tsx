import React from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import {
  useFavorityArticleMutation,
  useFollowUserMutation,
  useUnFavorityArticleMutation,
  useUnFollowUserMutation,
} from "../store/api/api.store";
import { useAuthUser } from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { LuSettings } from "react-icons/lu";
import { toast } from "react-toastify";

type Props = {
  type:
    | "ArticleFavBtn"
    | "ProfileFollowBtn"
    | "ArticlePageFavBtn"
    | "ProfileEditBtn";
  text?: number;
  slug?: string;
  username?: string;
  classname?: string;
  count?: number;
  isFavorited?: boolean;
  isFollowing?: boolean;
};

const FavourityBtn: React.FC<Props> = ({
  text,
  slug,
  type,
  isFollowing,
  username,
  classname,
  count,
  isFavorited,
}) => {
  const [useFavority] = useFavorityArticleMutation();
  const [useUnFavority] = useUnFavorityArticleMutation();
  const [useFollow] = useFollowUserMutation();
  const [useUnFollow] = useUnFollowUserMutation();
  const { isLogged } = useAuthUser();
  const navigate = useNavigate();
  const HandleFavorite = async () => {
    await useFavority(slug as string);
    toast.success(`You liked article`);
  };
  const UnHandleFavorite = async () => {
    await useUnFavority(slug as string);
    toast.success(`You unliked article`);
  };
  const FollowUser = async () => {
    await useFollow(username as string);
    toast.info(`You followed ${username}`);
  };
  const UnFollowUser = async () => {
    await useUnFollow(username as string);
    toast.info(`You unfollowed ${username}`);
  };

  if (type === "ArticleFavBtn") {
    return (
      <div
        onClick={() =>
          isLogged
            ? !isFavorited
              ? HandleFavorite()
              : UnHandleFavorite()
            : navigate(routes.signIn.path)
        }
        className={`border border-theme-green w-a h-auto px-2 py-1 text-theme-green hover:cursor-pointer flex items-center justify-center align-middle rounded-sm group hover:bg-theme-green focus:bg-theme-darkGreen ${
          isFavorited && `bg-theme-green text-white `
        }`}
      >
        <AiFillHeart
          color="#5CB85C"
          className={`group-hover:fill-white ${isFavorited && `fill-white`}`}
        />
        <p className="text-base group-hover:text-white">{text}</p>
      </div>
    );
  } else if (type === "ProfileFollowBtn") {
    return (
      <button
        className={`${classname} ${isFollowing && `bg-gray-200`}`}
        onClick={() =>
          isLogged
            ? !isFollowing
              ? FollowUser()
              : UnFollowUser()
            : navigate(routes.signIn.path)
        }
      >
        {" "}
        <AiOutlinePlus className="mr-1" />{" "}
        {isFollowing ? `UnFollow ${username}` : `Follow ${username}`}
      </button>
    );
  } else if (type === "ProfileEditBtn") {
    return (
      <button className={classname}>
        {" "}
        <LuSettings className="mr-1" /> Edit Profile Settings
      </button>
    );
  } else {
    return (
      <div
        onClick={() =>
          isLogged
            ? !isFavorited
              ? HandleFavorite()
              : UnHandleFavorite()
            : navigate(routes.signIn.path)
        }
        className={`border-theme-green border text-center text-theme-green flex justify-center items-center ml-2 rounded-sm p-1 cursor-pointer ${
          !isFavorited && `hover:bg-green-300`
        }  ${isFavorited && `bg-theme-green text-white `}`}
      >
        <AiFillHeart className="mr-1" />
        <p className="text-sm ">Favorite Article ({count})</p>
      </div>
    );
  }
};

export default FavourityBtn;
