import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./PostCard.module.scss";
import Skeleton from "../../../../shared/ui/Skeleton";
import Button from "../../../../shared/ui/Button";
import { AppDispatch, RootState } from "../../../../app/store";
import { fetchUser } from "../../../User/model/slices/userSlice";
import { useNavigate } from "react-router-dom";
import PostCardSkeleton from "../PostCardSkeleton/PostCardSkeleton";

interface PostCardProps {
  id: number;
  title: string;
  userId: number;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.users[userId]);
  const postsLoading = useSelector((state: RootState) => state.posts.loading);
  const userLoading = useSelector((state: RootState) => state.user.loading);

  const navigate = useNavigate();

  const handleNavigation = () => {
    localStorage.setItem("scrollPosition", String(window.scrollY));
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId, user]);

  if (postsLoading || userLoading || !user) {
    return <PostCardSkeleton />;
  }

  return (
    <div className={styles["post-card"]}>
      <div className={styles["post-card-header"]}>
        <h3>{title}</h3>
      </div>
      <div className={styles["post-card-footer"]}>
        <p>{user.name}</p>
        <Button onClick={handleNavigation}>Читать</Button>
      </div>
    </div>
  );
};

export default PostCard;
