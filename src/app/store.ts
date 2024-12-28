import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../entities/Post/model";
import { userReducer } from "../entities/User/model";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
