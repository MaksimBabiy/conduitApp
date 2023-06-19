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
  ArticleType,
} from "../../types";
import { FEED_PAGE_SIZE } from "../../const";
import { RootState } from "../store";
import { replaceCachedArticle } from "../../components/utils/router";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userData?.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
    },
  }),
  tagTypes: ["Articles", "User"],
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<GetGlobalFeedResponce, GlobalFeedParams>({
      query: ({ page, tag, isPersonal }) => ({
        url:
          !isPersonal || isPersonal == null
            ? `articles?limit=${FEED_PAGE_SIZE}&offset=${
                page * FEED_PAGE_SIZE
              }${tag ? `&tag=${tag}` : ""}`
            : `articles/feed?limit=${FEED_PAGE_SIZE}&offset=${
                page * FEED_PAGE_SIZE
              }${tag ? `&tag=${tag}` : ""}`,
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
    favorityArticle: builder.mutation<GetArticleResponce, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch);
      },
    }),
    unFavorityArticle: builder.mutation<GetArticleResponce, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch);
      },
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
  useFavorityArticleMutation,
  useUnFavorityArticleMutation,
} = articleApi;
