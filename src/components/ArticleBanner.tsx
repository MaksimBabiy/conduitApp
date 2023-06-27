import Container from "./Container";
import { ArticleType } from "../types";
import ArticleMeta from "./ArticleMeta";

type Props = {
  article: ArticleType;
  isMyArticle: boolean;
};

const ArticleBanner = (props: Props) => {
  return (
    <div className=" bg-theme-darkestGray">
      <Container>
        <div className="flex flex-col py-10 ">
          <div className="mb-10">
            <h1 className="text-white text-5xl text-justify">
              {props.article.title}
            </h1>
          </div>
          <ArticleMeta
            article={props.article}
            isMyArticle={props.isMyArticle}
          />
        </div>
      </Container>
    </div>
  );
};

export default ArticleBanner;
