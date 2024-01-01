import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { articleApi } from "./api/api.store";
import { feedSlice } from "./slices/feed.slice";
import { authApi } from "./api/api.auth";
import { authSlice } from "./slices/auth.slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { uploadApi } from "./api/api.upload";

const persistConfig = {
  key: "conduit",
  storage,
  whiteList: [authSlice.name, feedSlice.name],
};
const persistentReducer = persistReducer(
  persistConfig,
  combineReducers({
    [articleApi.reducerPath]: articleApi.reducer,
    [feedSlice.name]: feedSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistentReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(articleApi.middleware, authApi.middleware, uploadApi.middleware),
});
export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
