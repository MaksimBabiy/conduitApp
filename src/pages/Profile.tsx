import { useEffect, useState } from "react";

import ProfileBanner from "../components/ProfileBanner";

import ArticlesList from "../components/ArticlesList";
import { useSearchParams } from "react-router-dom";
import {
  useGetMyArticlesQuery,
  useGetProfileQuery,
} from "../store/api/api.store";
import Container from "../components/Container";
import Labels from "../components/Labels";
import { useGetUrlProfile } from "../hooks/useGetUrlProfile";
import { useAppDispatch } from "../store/store";
import { selectTag } from "../store/slices/feed.slice";

type Props = {};

const Profile = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { trimmedStr, pathname } = useGetUrlProfile();
  const [itemOffset, setItemOffset] = useState(
    Number(searchParams.get("page")) || 0
  );

  useEffect(() => {
    dispatch(selectTag("My Articles"));
  }, []);
  console.log("profile render", itemOffset);
  const { data: profileData } = useGetProfileQuery(
    {
      username: trimmedStr as string,
    },
    { skip: trimmedStr.length < 1 }
  );
  const { data, isLoading, isError, isFetching } = useGetMyArticlesQuery({
    page: itemOffset,
    author: trimmedStr as string,
    isFavorited: pathname.includes("/favorited"),
  });

  if (isError) {
    return (
      <h1 className="absolute top-[50%] left-[50%]">Something wrong...</h1>
    );
  }
  return (
    <>
      <ProfileBanner profile={profileData?.profile!} />
      <Container>
        <div className="mt-4">
          {" "}
          <Labels
            defaultValue="My Articles"
            defaultLink={`/@${trimmedStr}/`}
            additionalItem={[
              {
                value: "Favorited Articles",
                to: `/@${trimmedStr}/favorited`,
              },
            ]}
          />
          {isFetching || isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <ArticlesList
              isProfile={true}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              setItemOffset={setItemOffset}
              itemOffset={itemOffset}
              articles={data?.articles || []}
              articlesLength={data?.articlesCount || 0}
              itemsPerPage={5}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default Profile;
