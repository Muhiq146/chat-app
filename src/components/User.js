import React from "react";
import image from "../Doraemon.jpeg";

const User = ({ user, selectUser, chat }) => {
  return (
    <div
      className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
      onClick={() => selectUser(user)}
    >
      <div className="user_info">
        <div className="user_detail">
          <img src={user.avatar || image} alt={user.name} className="avatar" />
          <h4>{user.name}</h4>
        </div>
        <div
          className={`user_status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
};

export default User;
