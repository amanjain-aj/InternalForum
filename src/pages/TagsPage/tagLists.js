import React from "react";
import css from "./tags.module.css";
import { Link } from "react-router-dom";
const TagLists = ({ tagID, tagName, tagTitle }) => {
  let str = tagTitle;
  str = str.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={css.tag_block}>
      {" "}
      <Link to={`/question/${tagID}/${str}`}>
        <span className={css.tag_name}>{tagName}</span>
      </Link>
      <div className={css.about_tag}>{tagTitle} </div>{" "}
    </div>
  );
};

export default TagLists;
