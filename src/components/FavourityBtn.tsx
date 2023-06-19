import React from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import {
  useFavorityArticleMutation,
  useUnFavorityArticleMutation,
} from "../store/api/api.store";
import { useAuthUser } from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

type Props = {
  type: "ArticleFavBtn" | "ProfileFollowBtn" | "ArticlePageFavBtn";
  text?: number;
  slug?: string;
  username?: string;
  classname?: string;
  count?: number;
  isFavorited?: boolean;
};

const FavourityBtn: React.FC<Props> = ({
  text,
  slug,
  type,
  username,
  classname,
  count,
  isFavorited,
}) => {
  const [useFavority] = useFavorityArticleMutation();
  const [useUnFavority] = useUnFavorityArticleMutation();
  const { isLogged } = useAuthUser();
  const navigate = useNavigate();
  const HandleFavorite = async () => {
    await useFavority(slug as string);
  };
  const UnHandleFavorite = async () => {
    await useUnFavority(slug as string);
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
      <button className={classname}>
        {" "}
        <AiOutlinePlus className="mr-1" /> Follow {username}
      </button>
    );
  } else {
    return (
      <div
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
