import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Container from "../components/Container";
import Btn from "../components/Btn";
import {
  useCreateArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../store/api/api.store";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import TagList from "../components/TagList";
import MDEditor from "@uiw/react-md-editor";
type Props = {};
interface IInput {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const UpdateArticlePage = (props: Props) => {
  const { slug } = useParams();
  const { data } = useGetArticleQuery(slug as string);
  const [updateArticle] = useUpdateArticleMutation();
  const [inputChange, setInputChange] = useState<IInput>({
    title: data?.article.title as string,
    description: data?.article.description as string,
    body: data?.article.body as string,
    tagList: data?.article.tagList as string[],
  });

  const navigate = useNavigate();

  const InputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "tagList" && e.target.value.length > 0) {
      setInputChange({
        ...inputChange,
        [e.target.name]: e.target.value.replace(/ +/g, " ").split(" "),
      });
    } else {
      setInputChange({
        ...inputChange,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmitBtn = async () => {
    const data = {
      title: inputChange.title,
      description: inputChange.description,
      body: inputChange.body,
      slug: slug as string,
      tagList: inputChange.tagList,
    };
    await updateArticle(data)
      .unwrap()
      .then((data) => {
        toast.success("Article updated");
        navigate(`/articles/${data.article.slug}`);
      })
      .catch((err) => toast.error("Article not updated"));
  };

  const handleRemoveTag = (e: string) => {
    setInputChange({
      ...inputChange,
      tagList: inputChange.tagList.filter((item) => item !== e),
    });
  };

  return (
    <>
      <Container>
        <form className="mx-20 mb-20 mt-10">
          <Input
            name="title"
            placeholder="Article Title"
            value={inputChange.title}
            onChange={InputChange}
          />
          <Input
            name="description"
            placeholder="What's this article about?"
            onChange={InputChange}
            value={inputChange.description}
          />
          <div data-color-mode="light">
            <MDEditor
              textareaProps={{ name: "body" }}
              className="mb-5"
              height={400}
              value={inputChange.body}
              onChange={(e) =>
                setInputChange({
                  ...inputChange,
                  body: e as string,
                })
              }
            />
          </div>
          <Input
            name="tagList"
            placeholder="Enter tags"
            onChange={InputChange}
            value={inputChange.tagList && inputChange.tagList.join(" ")}
          />
          <TagList
            forEdit
            taglist={inputChange.tagList && inputChange.tagList}
            handleRemoveTag={handleRemoveTag}
          />
          <div className="flex justify-end">
            <Btn type="button" onClick={handleSubmitBtn}>
              Update Article
            </Btn>
          </div>
        </form>
      </Container>
    </>
  );
};

export default UpdateArticlePage;
