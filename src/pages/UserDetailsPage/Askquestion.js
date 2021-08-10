import React from "react";
import css from "./userDetails.module.css";
import { NavLink } from "react-router-dom";
const Askquestion = ({ qId, qtitle, status, title }) => {
  return (
    <div className={css.Questions_wrapper} key={qId}>
      <NavLink to={`/question/${qId}/${qtitle}`} className={css.post_link}>
        {status ? (
          <span style={{ color: "blue" }}> [solved] </span>
        ) : (
          <span className="text-danger"> [unsolved] </span>
        )}{" "}
        {title}
      </NavLink>
    </div>
  );
};

export default Askquestion;
