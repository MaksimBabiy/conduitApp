import Container from "./Container";
import { GetProfile } from "../types";

import { useGetUrlProfile } from "../hooks/useGetUrlProfile";
import CustomBtn from "./CustomBtn";
import { LuSettings } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "../store/api/api.store";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { toast } from "react-toastify";
import { routes } from "../routes";

type Props = {
  profile: GetProfile;
};

const ProfileBanner = (props: Props) => {
  const { isMyProfile } = useGetUrlProfile();
  const [useFollow] = useFollowUserMutation();
  const [useUnFollow] = useUnFollowUserMutation();
  const { isLogged } = useAuthUser();
  const navigate = useNavigate();

  const FollowUser = async () => {
    await useFollow(props.profile?.username);
    toast.info(`You followed ${props.profile?.username}`);
  };
  const UnFollowUser = async () => {
    await useUnFollow(props.profile?.username);
    toast.warning(`You unfollowed ${props.profile?.username}`);
  };
  return (
    <div
      className="w-full bg-gray-100 shadow-md h-auto flex justify-center flex-col
items-center text-white "
    >
      <img
        src={props.profile?.image}
        alt="img"
        className="w-[110px] rounded-full mt-10"
      />
      <p className="text-2xl mb-4 mt-4 text-black font-bold">
        {props.profile?.username}
      </p>
      <Container>
        <div className="flex justify-end text-black mb-4">
          {!isMyProfile ? (
            <CustomBtn
              type="ProfileFollowBtn"
              isFollowing={props.profile?.following}
              onClick={() =>
                isLogged
                  ? !props.profile?.following
                    ? FollowUser()
                    : UnFollowUser()
                  : navigate(routes.signIn.path)
              }
            >
              <AiOutlinePlus className="mr-1" />{" "}
              {props.profile?.following
                ? `UnFollow ${props.profile?.username}`
                : `Follow ${props.profile?.username}`}
            </CustomBtn>
          ) : (
            <CustomBtn type="ProfileEditBtn">
              {" "}
              <LuSettings className="mr-1" /> Edit Profile Settings
            </CustomBtn>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfileBanner;
