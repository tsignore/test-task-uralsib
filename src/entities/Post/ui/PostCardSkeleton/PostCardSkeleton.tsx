import React from "react";
import styles from "../PostCard/PostCard.module.scss";
import Skeleton from "../../../../shared/ui/Skeleton";

const PostCardSkeleton: React.FC = () => {
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
};

export default PostCardSkeleton;
