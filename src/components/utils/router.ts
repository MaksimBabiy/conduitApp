import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { articleApi } from "../../store/api/api.store";
import {
  ArticleType,
  GetGlobalFeedResponce,
  GlobalFeedParams,
} from "../../types";
import { MaybeDrafted } from "@reduxjs/toolkit/dist/query/core/buildThunks";

export const seroalizeSearchParams = (params: Record<string, string>) => {
  const strParams = new URLSearchParams(params);
  return strParams.toString();
};

export const replaceCachedArticle = async (
  getState: any,
  queryFulfilled: any,
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.articleApi.queries);
    for (
      let i = 0, key = feedKeys[i], queryItem = state.articleApi.queries[key];
      i < feedKeys.length;
      i++, key = feedKeys[i], queryItem = state.articleApi.queries[key]
    ) {
      if (!key.startsWith("getGlobalFeed")) {
        continue;
      }

      dispatch(
        articleApi.util.updateQueryData(
          "getGlobalFeed",
          queryItem!.originalArgs as GlobalFeedParams,
          (draft: MaybeDrafted<GetGlobalFeedResponce>) => {
            const updateId = draft.articles.findIndex(
              (article: ArticleType) => article.slug === data.article.slug
            );
            if (updateId >= 0) {
              draft.articles[updateId] = data.article;
            }
          }
        )
      );
    }
  } catch (e) {}
};
