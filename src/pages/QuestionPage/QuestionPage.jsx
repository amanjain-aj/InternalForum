import React, { useState, useEffect } from "react";
import css from "./Questions.module.css";
import QuestionData from "./QuestionData";
import { connect } from "react-redux";
import { FetchQuestion } from "../../Redux/actionCreators";
import Pagination from "./Pagination";

const QuestionPage = ({ Questionreducer, FetchQuestion }) => {
  useEffect(() => {
    FetchQuestion();
  }, [FetchQuestion]);

  const allQuestions = Questionreducer.questions;
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerpage] = useState(30);
  const [filterData, setfilterData] = useState();
  const [toggleState, setToggleState] = useState(3);
  const [searchQuary, setsearchQuary] = useState(null);

  const indexOfLastPage = currentPage * postsPerpage;
  const indexOfFirstPage = indexOfLastPage - postsPerpage;

  //------------filterquary-----------------------------------

  let filterquary =
    searchQuary &&
    allQuestions.filter((quary) =>
      quary.title.toLowerCase().includes(searchQuary.toLowerCase().trim())
    );

  // -------------------------------------------------

  const currentPosts = filterquary
    ? filterquary.slice(indexOfFirstPage, indexOfLastPage)
    : filterData
    ? filterData.slice(indexOfFirstPage, indexOfLastPage)
    : allQuestions.slice(indexOfFirstPage, indexOfLastPage);

  //------------------------------------------------

  //-------- REVERSE POST QUESTIONS--------------------
  currentPosts.reverse();

  //-------------change page---------------
  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  //--------- handleSearchQueary--------------------=
  const handleQueary = async (quary) => {
    if (!quary) {
      setsearchQuary(null);
    }
    setsearchQuary(quary);
  };

  //-----------------------------------------------------
  //------------------handleunsolved ---------------------

  const handleunsolved = (index) => {
    let currentPosts = allQuestions.filter((curdata) => {
      return curdata.isSolved === false;
    });
    setToggleState(index);
    setfilterData(currentPosts.reverse());
    setcurrentPage(1);
  };
  // ---------------------------------------------------

  // ------------------------- handlesolved---------------------------
  const handlesolved = (index) => {
    let currentPosts = allQuestions.filter((curdata) => {
      return curdata.isSolved === true;
    });
    setToggleState(index);
    setfilterData(currentPosts);
    setcurrentPage(1);
  };
  // --------------------------------------------------------------

  //--------------------handleAllQuestion-------------------------------
  const handleAllQuestion = (index) => {
    setToggleState(index);
    setfilterData(allQuestions);
  };
  // ----------------------------------------------------------------------
  return (
    <div>
      <div className={css.header}>
        <div>
          <h3 className={css.Questions}>Questions</h3>
        </div>
        <div className={css.middle_block}>
          <div className={css.search_field}>
            <img src="/images/search.png" alt="icon" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleQueary(e.target.value)}
            />
          </div>
        </div>
      </div>

      <nav className={css.Nav_items}>
        <span
          className={
            toggleState === 1
              ? `${css.Nav_links} ${css.active}`
              : `${css.Nav_links}`
          }
          onClick={() => handleunsolved(1)}
        >
          Unsolved
        </span>
        <span
          className={
            toggleState === 2
              ? `${css.Nav_links} ${css.active}`
              : `${css.Nav_links}`
          }
          onClick={() => handlesolved(2)}
        >
          Solved
        </span>
        <span
          className={
            toggleState === 3
              ? `${css.Nav_links} ${css.active}`
              : `${css.Nav_links}`
          }
          onClick={() => handleAllQuestion(3)}
        >
          All
        </span>
      </nav>

      {!currentPosts.length ? (
        <div className={css.notFound}>
          <img src="/images/notFound.svg" alt="not found" />
          <h5>Question Not Found. Try Again</h5>
        </div>
      ) : (
        <>
          {" "}
          <div className={`container ${css.Questions_container}`}>
            <QuestionData
              questionData={currentPosts}
              loading={Questionreducer.loading}
              error={Questionreducer.error}
            />
            <Pagination
              postsperPage={postsPerpage}
              totalpage={filterData ? filterData.length : allQuestions.length}
              paginate={paginate}
            />
          </div>{" "}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Questionreducer: state.Questionreducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchQuestion: () => dispatch(FetchQuestion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
