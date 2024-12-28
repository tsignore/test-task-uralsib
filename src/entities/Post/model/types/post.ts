export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsState {
  posts: Post[];
  page: number;
  loading: boolean;
  // loadingPosts: { [key: number]: boolean };
}
