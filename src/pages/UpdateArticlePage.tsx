import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Container from "../components/Container";
import Btn from "../components/Btn";
import {
  useCreateArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../store/api/api.store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import TagList from "../components/TagList";
type Props = {};
interface IInput {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const UpdateArticlePage = (props: Props) => {
  const { pathname } = useLocation();
  const url = pathname.split("editor/").pop();
  const { data } = useGetArticleQuery(url as string);

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
        [e.target.name]: e.target.value
          .trim()
          .split(" ")
          .filter((item) => item)
          .join(" ")
          .split(" ")
          .concat(data?.article.tagList as string[]),
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
      slug: url as string,
    };
    await updateArticle(data)
      .unwrap()
      .then((data) => {
        toast.success("Article updated");
        navigate(`/articles/${data.article.slug}`);
      })
      .catch((err) => toast.error("Article not updated"));
  };

  console.log(inputChange);
  return (
    <>
      <Container>
        <form className="mx-20 mb-20 mt-10">
          <Input
            name="title"
            placeholder="Article Title"
            defaultValue={data?.article.title}
            onChange={InputChange}
          />
          <Input
            name="description"
            placeholder="What's this article about?"
            onChange={InputChange}
            defaultValue={data?.article.description}
          />
          <textarea
            name="body"
            defaultValue={data?.article.body}
            placeholder="Write your article (in markdown)"
            className="w-full px-2 py-1 min-h-[200px] mb-5"
            onChange={InputChange}
          />
          <Input
            name="tagList"
            placeholder="Enter tags"
            onChange={InputChange}
          />
          <TagList taglist={data?.article.tagList as string[]} />
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
