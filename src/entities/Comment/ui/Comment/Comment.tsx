import React from "react";
import styles from "./Comment.module.scss";
import { Comment as CommentType } from "../../model";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <p>
        <strong>{comment.name}</strong> ({comment.email})
      </p>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;
