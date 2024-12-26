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

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, loading } = useSelector(
    (state: RootState) => state.posts
  );

  const loadPostsHandler = () => {
    if (!loading && posts.length === 0) {
      dispatch(loadPosts(page));
    }
  };

  useEffect(() => {
    loadPostsHandler();
  }, [posts.length]);

  const loadMoreHandler = () => {
    dispatch(setPage(page + 1));
    dispatch(loadPosts(page + 1));
  };

  return (
    <main className={styles["home-page"]}>
      <Container>
        <div className={styles["posts"]}>
          {posts.map((post: PostType) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              userId={post.userId}
            />
          ))}
        </div>
        {posts.length ? (
          <button
            className={styles["load-more-button"]}
            onClick={loadMoreHandler}
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Загрузить еще"}
          </button>
        ) : (
          ""
        )}
      </Container>
    </main>
  );
};

export default HomePage;
