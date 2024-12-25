import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts";
import PostCard from "../../features/PostCard";
import styles from "./HomePage.module.scss";
import Container from "../../shared/components/Container";

const HomePage = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

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
      </Container>
    </main>
  );
};

export default HomePage;
