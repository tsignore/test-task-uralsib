import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../../api/posts";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  posts: Post[];
  page: number;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  page: 1,
  loading: false,
};

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (page: number) => {
    const response = await fetchPosts(page, 12);
    return response;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        const newPosts = action.payload;
        const uniquePosts = newPosts.filter(
          (post: Post) =>
            !state.posts.some((existingPost) => existingPost.id === post.id)
        );
        state.posts = [...state.posts, ...uniquePosts];
        state.loading = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPage } = postsSlice.actions;

export default postsSlice.reducer;
