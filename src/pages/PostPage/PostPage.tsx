import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from "./PostPage.module.scss";
import Container from "../../shared/ui/Container";
import Button from "../../shared/ui/Button";
import CommentList from "../../entities/Comment/ui/CommentList";
import { RootState } from "../../app/store";
import { setPage } from "../../entities/Post/model";
import { Comment } from "../../entities/Comment/model";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.id === Number(id))
  );

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!post) {
      dispatch(setPage(1));
    }

    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        setComments(response.data);
      } catch (err) {
        setError("Failed to fetch comments. Please try again later.");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [id, post, dispatch]);

  if (!post) return <p>Пост не найден.</p>;
  if (loadingComments)
    return (
      <div className={styles["loading-screen"]}>
        <p>Загрузка...</p>
      </div>
    );
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <Container>
      <div className={styles["post-details"]}>
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <div className={styles["post-content"]}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <CommentList comments={comments} />
      </div>
    </Container>
  );
};

export default PostPage;
