import React from "react";
import ArticleBanner from "../components/ArticleBanner";
import { useGetArticleQuery } from "../store/api/api.store";
import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import TagList from "../components/TagList";
import ArticleMeta from "../components/ArticleMeta";
import CommentsList from "../components/CommentsList";
import { useAppSelector } from "../store/store";
import MDEditor from "@uiw/react-md-editor";

type Props = {};

const ArticlePage = (props: Props) => {
  const { pathname } = useLocation();

  const { data: articleData } = useGetArticleQuery(
    pathname.split(`/articles/`)[1]
  );
  const userData = useAppSelector((state) => state.auth.userData);

  return articleData ? (
    <>
      {" "}
      <ArticleBanner
        article={articleData?.article!}
        isMyArticle={userData?.username === articleData.article.author.username}
      />
      <Container>
        <div className="my-8 border-b">
          <div data-color-mode="light" className="mb-5">
            <MDEditor.Markdown source={articleData.article.body} />
          </div>
          <TagList taglist={articleData.article.tagList} classname="mb-5" />
        </div>
        <div className="flex justify-center mb-8">
          <ArticleMeta
            article={articleData.article!}
            isMyArticle={
              userData?.username === articleData.article.author.username
            }
          />
        </div>
        <CommentsList />
      </Container>
    </>
  ) : (
    <></>
  );
};

export default ArticlePage;
