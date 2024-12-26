import React from "react";
import styles from "./CommentList.module.scss";
import Comment from "../Comment";
import { Comment as CommentType } from "../../model";

interface CommentListProps {
  comments: CommentType[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className={styles["comments-section"]}>
      <h2>Комментарии</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
