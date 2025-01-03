import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./HomePage.module.scss";
import Container from "../../shared/ui/Container";
import { AppDispatch, RootState } from "../../app/store";
import PostCard from "../../entities/Post/ui/PostCard";
import {
  loadPosts,
  Post as PostType,
  setPage,
} from "../../entities/Post/model";
import { useInfiniteScroll } from "../../features/infiniteScroll/useInfiniteScroll";
import PostCardSkeleton from "../../entities/Post/ui/PostCardSkeleton/PostCardSkeleton";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, loading } = useSelector(
    (state: RootState) => state.posts
  );

  const hasMore = posts.length < 100;

  const loadMoreHandler = () => {
    if (!loading) {
      dispatch(setPage(page + 1));
      dispatch(loadPosts(page + 1));
    }
  };

  useInfiniteScroll(loading, hasMore, loadMoreHandler);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(loadPosts(page));
    }

    const savedScrollPosition = localStorage.getItem("scrollPosition");

    if (savedScrollPosition) {
      window.scrollTo(0, Number(savedScrollPosition));
      localStorage.removeItem("scrollPosition");
    }
  }, [dispatch, page, posts.length]);

  useEffect(() => {
    if (posts.length === 0 && !loading) {
      dispatch(loadPosts(page));
    }
  }, [dispatch, page, posts.length, loading]);

  return (
    <main className={styles["home-page"]}>
      <Container>
        <div className={styles["posts"]}>
          {loading &&
            Array.from({ length: 18 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          {!loading &&
            posts.map((post: PostType) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                userId={post.userId}
              />
            ))}
        </div>
      </Container>
    </main>
  );
};

export default HomePage;
