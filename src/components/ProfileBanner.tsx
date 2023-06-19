import Container from "./Container";
import { GetProfile } from "../types";
import FavourityBtn from "./FavourityBtn";

type Props = {
  profile: GetProfile;
};

const ProfileBanner = (props: Props) => {
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
          <FavourityBtn
            type="ProfileFollowBtn"
            username={props.profile?.username}
            classname="border-gray-300 border-2 p-1 flex items-center text-gray-400 hover:bg-gray-300 "
          />
        </div>
      </Container>
    </div>
  );
};

export default ProfileBanner;
