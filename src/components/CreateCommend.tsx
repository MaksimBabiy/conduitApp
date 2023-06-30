import React, { useState } from "react";
import { useAppSelector } from "../store/store";
import CustomBtn from "./CustomBtn";
import { useCreateCommentMutation } from "../store/api/api.store";
import { toast } from "react-toastify";

type Props = {
  slug: string;
};

const CreateCommend = (props: Props) => {
  const userData = useAppSelector((state) => state.auth.userData);
  const [textAreaInput, setTextAreaInput] = useState("");
  const [useCreateComment] = useCreateCommentMutation();
  const HandleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaInput(e.target.value);
  };
  const HandleComment = async () => {
    await useCreateComment({ slug: props.slug, body: textAreaInput })
      .unwrap()
      .then((data) => toast.success("Posted Comment"))
      .then((data) => setTextAreaInput(""))
      .catch((err) => toast.error("Smth wents wrong!"));
  };
  return (
    <div className="bg-gray-200 w-[550px] rounded-md mb-5">
      <textarea
        onChange={HandleTextArea}
        value={textAreaInput}
        placeholder="Write a comment..."
        className="border-2 border-gray-200 p-5 rounded-md w-[550px] m-0"
      />
      <div className="px-5 pb-2 flex justify-between">
        <img src={userData?.image} alt="" className="w-[30px] rounded-full" />
        <CustomBtn
          disabled={textAreaInput.length < 1}
          type="CreateCommend"
          onClick={() => HandleComment()}
        >
          Post Comment
        </CustomBtn>
      </div>
    </div>
  );
};

export default CreateCommend;
