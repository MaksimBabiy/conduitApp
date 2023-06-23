import React, { useState } from "react";
import Input from "../components/Input";
import Container from "../components/Container";
import Btn from "../components/Btn";
import { useCreateArticleMutation } from "../store/api/api.store";
import { useNavigate } from "react-router-dom";

type Props = {};
interface IInput {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const NewArticlePage = (props: Props) => {
  const [inputChange, setInputChange] = useState<IInput>({
    title: "",
    description: "",
    body: "",
    tagList: [""],
  });
  const navigate = useNavigate();
  const [createArticle] = useCreateArticleMutation();
  const InputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "tagList" && e.target.value.length > 1) {
      setInputChange({
        ...inputChange,
        [e.target.name]: e.target.value
          .trim()
          .split(" ")
          .filter((item) => item)
          .join(" ")
          .split(" "),
      });
    } else {
      setInputChange({
        ...inputChange,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = () => {
    createArticle(inputChange);
    navigate("/");
  };
  return (
    <>
      <Container>
        <div className="mx-20 my-20">
          {" "}
          <Input
            name="title"
            placeholder="Article Title"
            value={inputChange?.title}
            onChange={InputChange}
          />
          <Input
            name="description"
            placeholder="What's this article about?"
            onChange={InputChange}
            value={inputChange?.description}
          />
          <textarea
            name="body"
            value={inputChange?.body}
            placeholder="Write your article (in markdown)"
            className="w-full px-2 py-1 min-h-[200px] mb-5"
            onChange={InputChange}
          />
          <Input
            name="tagList"
            // value={inputChange?.tagList}
            placeholder="Enter tags"
            onChange={InputChange}
          />
          <div className="flex justify-end">
            <Btn onClick={() => handleSubmit()}>Publish Article</Btn>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewArticlePage;
