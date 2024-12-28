import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./PostCard.module.scss";
import Skeleton from "../../../../shared/ui/Skeleton";
import Button from "../../../../shared/ui/Button";
import { AppDispatch, RootState } from "../../../../app/store";
import { fetchUser } from "../../../User/model/slices/userSlice";
import { useNavigate } from "react-router-dom";

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
    return (
      <div className={styles["post-card"]}>
        <div>
          <Skeleton
            width="100%"
            height="22px"
            className={styles["skeleton-text"]}
          />
          <Skeleton
            width="85%"
            height="22px"
            className={styles["skeleton-text"]}
          />
          <Skeleton
            width="80%"
            height="22px"
            className={styles["skeleton-text"]}
          />
        </div>
        <Skeleton width="100px" height="20px" borderRadius="5px" />
      </div>
    );
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
