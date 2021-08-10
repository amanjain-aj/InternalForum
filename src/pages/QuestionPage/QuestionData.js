import React from "react";
import { NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import css from "./Questions.module.css";

const QuestionData = ({ questionData, loading, error }) => {
  return (
    <ul className="list-group">
      {loading ? (
        <div className="d-flex ">
          <Spinner animation="grow" />
          <Spinner animation="grow" variant="info" />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        questionData &&
        questionData.map((posts) => {
          // Remove white spaces
          let str = posts.title;
          str = str.replace(/\s+/g, "-").toLowerCase();

          return (
            <div key={posts._id} className={css.Questions_wrapper}>
              <NavLink
                to={`/question/${posts._id}/${str}`}
                className={css.posts_links}
              >
                {posts.title}
              </NavLink>
              <div className={css.info_section}>
                <div className="d-flex flex-wrap">
                  <p className={css.times}>
                    {new Date(posts.createdAt).toLocaleString()}
                  </p>

                  <p className={css.user_name}>{posts.userName}</p>
                </div>
                <div className={`"d-flex flex-wrap ${css.tags}`}>
                  {posts.tags.map((tags, idx) => (
                    <p key={idx}>{tags}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </ul>
  );
};

export default QuestionData;
