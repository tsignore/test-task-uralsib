import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.scss";
import { fetchUser } from "../../api/users";
import Button from "../../shared/components/Button";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, userId }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const fetchedUser = await fetchUser(userId);
      setUserData(fetchedUser);
    };
    loadUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
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
