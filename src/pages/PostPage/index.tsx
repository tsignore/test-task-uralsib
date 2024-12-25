import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./PostPage.module.scss";
import Container from "../../shared/components/Container";
import Button from "../../shared/components/Button";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`),
          axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
          ),
        ]);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        setError("Failed to fetch post details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <Container>
      <div className={styles["post-details"]}>
        <Button onClick={() => navigate(-1)}>Назад</Button>
        {post && (
          <div className={styles["post-content"]}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        )}
        <div className={styles["comments-section"]}>
          <h2>Комментарии</h2>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p>
                <strong>{comment.name}</strong> ({comment.email})
              </p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PostPage;
