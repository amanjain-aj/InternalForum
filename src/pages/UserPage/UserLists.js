import React from "react";
import css from "./user.module.css";
import { Link } from "react-router-dom";

const UserLists = ({ userID, userName, userEmail }) => {
  return (
    <div key={userID} className={css.card_wrapper}>
      <div>
        <img
          src={`https://secure.gravatar.com/avatar/${userID}?s=164&d=identicon`}
          alt="users"
          width="40px"
        />
      </div>
      <div className={css.user_info}>
        <Link to={`/users/${userID}/${userName}`} className={css.user_name}>
          {userName}
        </Link>
        <p className={css.user_email}>{`${userEmail}`}</p>
      </div>
    </div>
  );
};

export default UserLists;
