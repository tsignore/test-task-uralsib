import { useEffect, useState } from "react";
import { fetchPosts } from "../../api/posts";

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
    <div>
      <h1>Home Page</h1>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
