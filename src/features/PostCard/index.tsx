import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.scss";
import { fetchUser } from "../../api/users";
import Button from "../../shared/components/Button";
import Skeleton from "../../shared/ui/Skeleton";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, userId }) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const fetchedUser = await fetchUser(userId);
      setUserData(fetchedUser);
      setLoading(false);
    };
    loadUserData();
  }, [userId]);

  if (loading) {
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
        <p>{userData.name}</p>
        <Button to={`/post/${id}`}>Читать</Button>
      </div>
    </div>
  );
};

export default PostCard;
