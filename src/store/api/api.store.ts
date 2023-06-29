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
  CreateArticleRequest,
  CreateArticle,
  EditArticle,
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
      providesTags: ["Articles", "User"],
    }),
    getMyArticles: builder.query<GetGlobalFeedResponce, MyArticlesParams>({
      query: ({ page, author, isFavorited = false }) =>
        `articles?limit=${FEED_PAGE_SIZE}&offset=${page * FEED_PAGE_SIZE}${
          isFavorited ? `&favorited=${author}` : `&author=${author}`
        }`,
      providesTags: ["Articles"],
    }),
    getProfile: builder.query<GetGlobalProfile, ProfileParams>({
      query: ({ username }) => `profiles/${username}`,
      providesTags: ["User"],
    }),
    getGlobalTags: builder.query<GetGlobalTags, void>({
      query: () => `tags`,
    }),
    getArticle: builder.query<GetArticleResponce, string>({
      query: (slug) => `articles/${slug}`,
      providesTags: ["User", "Articles"],
    }),
    getArticleComments: builder.query<GetCommentResponce, string>({
      query: (slug) => `articles/${slug}/comments`,
    }),
    followUser: builder.mutation<GetGlobalProfile, string>({
      query: (username) => ({
        url: `/profiles/${username}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    unFollowUser: builder.mutation<GetGlobalProfile, string>({
      query: (username) => ({
        url: `/profiles/${username}/follow`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    favorityArticle: builder.mutation<GetArticleResponce, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
      }),
      // onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
      //   await replaceCachedArticle(getState, queryFulfilled, dispatch);
      // },
      invalidatesTags: ["Articles"],
    }),
    unFavorityArticle: builder.mutation<GetArticleResponce, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
      // onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
      //   await replaceCachedArticle(getState, queryFulfilled, dispatch);
      // },
    }),
    createArticle: builder.mutation<CreateArticleRequest, CreateArticle>({
      query: (data) => ({
        url: `articles`,
        method: "POST",
        body: {
          article: data,
        },
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (data) => ({
        url: `articles/${data}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation<GetArticleResponce, EditArticle>({
      query: (args) => {
        const { slug, title, description, body, tagList } = args;
        return {
          url: `articles/${slug}`,
          method: "PUT",
          body: {
            article: { title, description, body, tagList },
          },
        };
      },
      invalidatesTags: ["Articles"],
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
  useFollowUserMutation,
  useUnFollowUserMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} = articleApi;
