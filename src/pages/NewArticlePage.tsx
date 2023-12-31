import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Container from "../components/Container";
import Btn from "../components/Btn";
import { useCreateArticleMutation } from "../store/api/api.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
type Props = {};
interface IInput {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
interface IFormError {
  title: string;
  description: string;
  body: string;
  tagList: string;
}
const NewArticlePage = (props: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputChange, setInputChange] = useState<IInput>({
    title: "",
    description: "",
    body: "",
    tagList: [""],
  });
  const [formError, setFormError] = useState<IFormError>({
    title: "title is required",
    description: "description is required",
    body: "body is required",
    tagList: "tagList is required",
  });
  const [isDirtyForm, setDirtyForm] = useState({
    title: false,
    description: false,
    body: false,
    tagList: false,
  });

  const BlurHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDirtyForm({
      ...isDirtyForm,
      [e.target.name]: true,
    });
  };

  const navigate = useNavigate();
  const [createArticle] = useCreateArticleMutation();
  const TextAreaChange = (e: string) => {
    setInputChange({
      ...inputChange,
      body: e,
    });

    if (e.length <= 3 && e.length !== 0)
      setFormError({
        ...formError,
        body: `body should be more 3`,
      });
    else if (e.length > 3) setFormError({ ...formError, body: "" });
    else
      setFormError({
        ...formError,
        body: `body is required`,
      });

    setIsDisabled(!Object.values(formError).every((x) => x === ""));
  };
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

    if (e.target.value.length <= 3 && e.target.value.length !== 0)
      setFormError({
        ...formError,
        [e.target.name]: `${e.target.name} should be more 3`,
      });
    else if (e.target.value.length > 3)
      setFormError({ ...formError, [e.target.name]: "" });
    else
      setFormError({
        ...formError,
        [e.target.name]: `${e.target.name} is required`,
      });

    setIsDisabled(!Object.values(formError).every((x) => x === ""));
  };

  const handleSubmitBtn = async () => {
    await createArticle(inputChange)
      .unwrap()
      .then((data) => {
        toast.success("Створенно нову статтю");
        navigate(`/articles/${data.article.slug}`);
      })
      .catch((err) => toast.error("Не вдалось створити статтю"));
  };

  return (
    <>
      <Container>
        <form className="mx-20 mb-20 mt-10">
          <ul className="mb-5">
            {isDirtyForm.title &&
              Object.keys(formError).map((item, index) => (
                <li className="text-red-500" key={index}>
                  {formError[item as keyof IFormError]}
                </li>
              ))}
          </ul>

          <Input
            onBlur={BlurHandler}
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
          <div data-color-mode="light">
            <MDEditor
              textareaProps={{ name: "body" }}
              className="mb-5"
              height={400}
              value={inputChange.body}
              onChange={(e) => TextAreaChange(e as string)}
            />
          </div>
          <Input
            onBlur={BlurHandler}
            name="tagList"
            // value={inputChange?.tagList}
            placeholder="Enter tags"
            onChange={InputChange}
          />
          <div className="flex justify-end">
            <Btn disabled={isDisabled} type="button" onClick={handleSubmitBtn}>
              Publish Article
            </Btn>
          </div>
        </form>
      </Container>
    </>
  );
};

export default NewArticlePage;
