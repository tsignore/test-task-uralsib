export * from "./types/post";

export {
  default as postsReducer,
  setPage,
  loadPosts,
} from "./slices/postsSlice";

export { fetchPosts } from "./services/fetchPosts";
