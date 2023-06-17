import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  username: string;
  classname?: string;
};

const FollowBtn = (props: Props) => {
  return (
    <button className={props.classname}>
      {" "}
      <AiOutlinePlus className="mr-1" /> Follow {props.username}
    </button>
  );
};

export default FollowBtn;
