import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts";
import PostCard from "../../features/PostCard";
import styles from "./HomePage.module.scss";

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
    </main>
  );
};

export default HomePage;
