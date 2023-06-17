import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetGlobalFeedResponce,
  GlobalFeedParams,
  GetGlobalTags,
  MyArticlesParams,
  GetGlobalProfile,
  ProfileParams,
  GetArticleResponce,
  GetCommentResponce,
} from "../../types";
import { FEED_PAGE_SIZE } from "../../const";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api/",
  }),
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<GetGlobalFeedResponce, GlobalFeedParams>({
      query: ({ page, tag, isPersonal, token }) => ({
        url: !isPersonal
          ? `articles?limit=${FEED_PAGE_SIZE}&offset=${page * FEED_PAGE_SIZE}${
              tag ? `&tag=${tag}` : ""
            }`
          : `articles/feed?limit=${FEED_PAGE_SIZE}&offset=${
              page * FEED_PAGE_SIZE
            }${tag ? `&tag=${tag}` : ""}`,
        headers: { Authorization: `Token ${token}` },
      }),
    }),
    getMyArticles: builder.query<GetGlobalFeedResponce, MyArticlesParams>({
      query: ({ page, author, isFavorited = false }) =>
        `articles?limit=${FEED_PAGE_SIZE}&offset=${page * FEED_PAGE_SIZE}${
          isFavorited ? `&favorited=${author}` : `&author=${author}`
        }`,
    }),
    getProfile: builder.query<GetGlobalProfile, ProfileParams>({
      query: ({ username }) => `profiles/${username}`,
    }),
    getGlobalTags: builder.query<GetGlobalTags, void>({
      query: () => `tags`,
    }),
    getArticle: builder.query<GetArticleResponce, string>({
      query: (slug) => `articles/${slug}`,
    }),
    getArticleComments: builder.query<GetCommentResponce, string>({
      query: (slug) => `articles/${slug}/comments`,
    }),
  }),
});

export const {
  useGetGlobalFeedQuery,
  useGetGlobalTagsQuery,
  useGetMyArticlesQuery,
  useGetProfileQuery,
  useGetArticleQuery,
  useGetArticleCommentsQuery,
} = articleApi;
