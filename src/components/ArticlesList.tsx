import React from "react";
import Article from "./Article";
import { ArticleType } from "../types";
import ReactPaginate from "react-paginate";
import { FEED_PAGE_SIZE } from "../const";
import { SetURLSearchParams } from "react-router-dom";
import { seroalizeSearchParams } from "./utils/router";
import { useAppSelector } from "../store/store";

type Props = {
  articles: ArticleType[];
  articlesLength: number;
  itemsPerPage: number;
  setSearchParams: SetURLSearchParams;
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
  itemOffset: number;
  isProfile: boolean;
  searchParams: URLSearchParams;
};

const ArticlesList: React.FC<Props> = (props) => {
  const pageCount = Math.ceil(props.articlesLength / FEED_PAGE_SIZE);
  const tag = useAppSelector((state) => state.feed.selectedTag);
  const handlePageClick = ({ selected }: { selected: number }) => {
    props.setItemOffset(selected);
    props.setSearchParams(
      props.isProfile
        ? seroalizeSearchParams({
            page: String(selected),
          })
        : seroalizeSearchParams({
            page: String(selected),
            tag: tag === "Global Feed" ? "" : tag,
          })
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if (props.articlesLength === 0) {
    return <p>Немає жодної статі</p>;
  }
  return (
    <>
      {props.articles?.map((item: ArticleType, index: number) => (
        <Article key={index} article={item} />
      ))}
      <ReactPaginate
        breakLabel="..."
        previousLabel={null}
        nextLabel={null}
        initialPage={props.itemOffset}
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageCount}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageClassName="group"
        containerClassName="flex justify-center "
        pageLinkClassName="px-3 py-3 text-theme-green border border-theme-gray -ml-px  hover:bg-theme-pageHoverBg hover:no-underline group-[&:nth-child(2)]:rounded-l-md group-[&:nth-last-child(2)]:rounded-r-md"
        activeClassName="active group"
        activeLinkClassName="group-[.active]:bg-theme-green group-[.active]:text-white group-[.active]:border-theme-green"
      />
    </>
  );
};

export default ArticlesList;
