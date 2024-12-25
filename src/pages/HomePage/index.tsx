import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts";
import PostCard from "../../features/PostCard";
import styles from "./HomePage.module.scss";
import Container from "../../shared/components/Container";

const HomePage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const POSTS_PER_PAGE = 12;

  const loadPosts = async () => {
    if (loading) return;
    setLoading(true);
    const newPosts = await fetchPosts(page, POSTS_PER_PAGE);

    setPosts((prev) => {
      const uniquePosts = newPosts.filter(
        (post: { id: any }) =>
          !prev.some((existingPost) => existingPost.id === post.id)
      );
      return [...prev, ...uniquePosts];
    });

    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  return (
    <main className={styles["home-page"]}>
      <Container>
        <div className={styles["posts"]}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={0}
              title={post.title}
              body={post.body}
              userId={post.userId}
            />
          ))}
        </div>
        <button
          className={styles["load-more-button"]}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Загрузить еще"}
        </button>
      </Container>
    </main>
  );
};

export default HomePage;
