import { AiFillHeart } from "react-icons/ai";

type Props = {
  count: number;
};

const FavoriteBtn = (props: Props) => {
  return (
    <div className="border-theme-green border text-center text-theme-green flex justify-center items-center ml-2 rounded-sm p-1 cursor-pointer hover:bg-green-300 ">
      <AiFillHeart className="mr-1" />
      <p className="text-sm ">Favorite Article ({props.count})</p>
    </div>
  );
};

export default FavoriteBtn;
