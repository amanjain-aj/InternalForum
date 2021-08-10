import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { FetchTag } from "../../Redux/actionCreators";
import TagLists from "./tagLists";
import css from "./tags.module.css";

const TagsPage = ({ tag, FetchTags }) => {
  // console.log(tag);
  const [fetchSearch, setSearch] = useState(null);

  useEffect(() => {
    FetchTags(fetchSearch);
  }, [FetchTags, fetchSearch]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const tags = tag.tags;

  return (
    <div className={css.tags_wrapper}>
      <h4 className={css.tag}>Tags </h4>
      <p className={css.tag_content}>
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </p>
      <div className={css.filter_field}>
        <img src="/images/search.png" alt="icon" />
        <input
          type="search"
          className="pl-2"
          placeholder="Search by tag..."
          onChange={handleChange}
        />
      </div>
      <section className={css.tag_container}>
        {!fetchSearch ? (
          <>
            <img src="/images/tagSearch.svg" alt="search tag" />
            <h5>Search Questions by Tags</h5>
          </>
        ) : (
          <div className={css.row}>
            {tag.loading ? (
              <div className="d-flex ">
                <Spinner animation="grow" />
                <Spinner animation="grow" variant="info" />
              </div>
            ) : tag.error ? (
              <div className={css.notFound}>
                <img src="/images/notFound.svg" alt="not found" />
                <h5>Tag Not Found. Try Again</h5>
              </div>
            ) : (
              tags &&
              tags.map((tag) => {
                return (
                  <div key={tag._id}>
                    <TagLists
                      tagID={tag._id}
                      tagTitle={tag.title}
                      tagName={fetchSearch}
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tag: state.TagReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchTags: (fetchSearch) => dispatch(FetchTag(fetchSearch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPage);
