import { useState } from "react";
import ArticlesList from "./ArticlesList";
import PopularTags from "./PopularTags";
import { useGetGlobalFeedQuery } from "../store/api/api.store";
import { useMatch, useSearchParams } from "react-router-dom";
import Labels from "./Labels";
import { routes } from "../routes";
import { useAuthUser } from "../hooks/useAuthUser";

type Props = {};

const Feed = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isPersonalFeed = useMatch(routes.home2);
  const [itemOffset, setItemOffset] = useState(
    Number(searchParams.get("page")) || 0
  );
  const { isLogged } = useAuthUser();
  const { data, isLoading, isError, isFetching } = useGetGlobalFeedQuery({
    page: itemOffset,
    tag: searchParams.get("tag") as string,
    author: "",
    isPersonal: Boolean(isPersonalFeed),
  });

  if (isError) {
    return (
      <h1 className="absolute top-[50%] left-[50%]">
        Something wents wrong...
      </h1>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="py-4 pr-4 w-3/4">
          <Labels
            defaultValue="Global Feed"
            defaultLink="/"
            additionalItem={
              isLogged ? [{ value: "Your feed", to: `/personalFeed` }] : []
            }
          />
          {isFetching || isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <ArticlesList
              isProfile={false}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              setItemOffset={setItemOffset}
              itemOffset={itemOffset}
              articles={data?.articles!}
              articlesLength={data?.articlesCount!}
              itemsPerPage={5}
            />
          )}
        </div>
        <div className="py-4 pl-4 w-1/4">
          <PopularTags
            setSearchParams={setSearchParams}
            setItemOffset={setItemOffset}
          />
        </div>
      </div>
    </>
  );
};

export default Feed;
