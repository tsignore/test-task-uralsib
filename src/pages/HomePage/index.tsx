import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPosts, setPage } from "../../features/posts/postsSlice";
import PostCard from "../../features/PostCard";
import styles from "./HomePage.module.scss";
import Container from "../../shared/components/Container";
import { AppDispatch, RootState } from "../../store";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, loading } = useSelector(
    (state: RootState) => state.posts
  );

  const loadPostsHandler = () => {
    if (!loading) {
      dispatch(loadPosts(page));
    }
  };

  useEffect(() => {
    loadPostsHandler();
  }, [dispatch, page]);

  return (
    <main className={styles["home-page"]}>
      <Container>
        <div className={styles["posts"]}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              userId={post.userId}
            />
          ))}
        </div>
        <button
          className={styles["load-more-button"]}
          onClick={() => dispatch(setPage(page + 1))}
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Загрузить еще"}
        </button>
      </Container>
    </main>
  );
};

export default HomePage;
