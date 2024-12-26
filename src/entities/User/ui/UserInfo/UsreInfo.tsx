import React from "react";
import { User } from "../../model";

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
};

export default UserInfo;
