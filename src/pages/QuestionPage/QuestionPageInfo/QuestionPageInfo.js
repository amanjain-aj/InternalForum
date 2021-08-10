import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { FetchQuestion } from "../../../Redux/actionCreators";
import PageTitle from "../../../components/PageTitle/PageTitle";
import css from "./pagedetails.module.css";
import { Spinner } from "react-bootstrap";
// import { Editor } from "react-draft-wysiwyg";
import { svg } from "./deletebtn.svg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import AnswerDeleteModal from "./AnswerDeleteModal";
// TOAST CONFIG
toast.configure();

const QuestionPageInfo = ({ Questionreducer, FetchQuestion }) => {
  let { id } = useParams();
  const [answer, setanswer] = useState("");
  const [userID, setuserID] = useState();
  const [solved, setsolved] = useState();
  const userData = window.localStorage.getItem("userdata").split(" ");
  const history = useHistory();
  const [bodyError, setBodyError] = useState("");
  const [isSure, setIsSure] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    FetchQuestion();
    const getQuestionInfo = async () => {
      let Questiondata = await axios.get(
        `https://internalforum.herokuapp.com/api/get/allposts/questionId/${id}`
      );
      setuserID(Questiondata.data[0].userID);
      setsolved(Questiondata.data[0].isSolved);
    };
    getQuestionInfo();
  }, [FetchQuestion, id, solved]);

  const validate = () => {
    if (!answer) {
      setBodyError("Body Missing");
      return false;
    }
    return true;
  };

  //--------- HANDLETEXTAREA----------------------------------------
  const handletextarea = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      console.log(bodyError);
    }
    try {
      await axios.post(`https://internalforum.herokuapp.com/api/post/answer/${id}`, {
        answeredUserID: userData[0],
        answeredUserName: userData[1],
        answer,
      });

      setanswer("");
      FetchQuestion();
    } catch (error) {}
  };

  // -----------------------------------------------------------

  if (Questionreducer.loading) {
    return (
      <div className="d-flex ">
        <Spinner animation="grow" />
        <Spinner animation="grow" variant="info" />
      </div>
    );
  }

  const filterDataItem = Questionreducer.questions.filter((filterdata) => {
    return filterdata._id === id;
  });

  // ------------------- handleDeletebtn -------------------
  const handleRemoveConfirm = () => {
    setShow(true);
    setIsSure(true);
  };
  const handleDeleteConfirm = () => {
    setShow(true);
    setIsConfirm(true);
  };

  const handleDeletebtn = async () => {
    if (isSure) {
      try {
        await axios.delete(`https://internalforum.herokuapp.com/api/delete/${id}`);
        history.push("/questions");
        toast.success("Question Deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsSure(false);
        setShow(false);
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  // ----------------------------------------------------------------

  //--------------------------handleAnswerDelete -----------------------

  const handleAnswerDelete = async (answerId) => {
    let token = window.localStorage.getItem("userdata").split(" ")[2];

    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    };

    if (isConfirm) {
      try {
        await axios.delete(
          `https://internalforum.herokuapp.com/api/question/${id}/delete/${answerId}`,
          config
        );
        FetchQuestion();
        toast.success("Your Answer is Deleted Successfully ", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsConfirm(false);
        setShow(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // ----------------------------------------------------------

  //------------------- handleSolvedAndUnsolved -----------------------------
  const handleSolvedAndUnsolved = async (status) => {
    try {
      await axios.put(
        `https://internalforum.herokuapp.com/api/question/status/${id}/${status}`
      );

      let data = await axios.get(
        `https://internalforum.herokuapp.com/api/get/allposts/questionId/${id}`
      );
      setsolved(data.data[0].isSolved);

      toast.success("Status Updated ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------------------------

  return (
    <>
      {filterDataItem &&
        filterDataItem.map((filterdata) => {
          return (
            <div key={filterdata._id}>
              <PageTitle
                title={`${filterdata.userName} | ${filterdata.title}`}
              />
              <div className={css.page_wrapper}>
                <h4 className={css.page_title}>
                  {solved ? <span>[Solved]</span> : <span>[Unsolved]</span>}{" "}
                  {filterdata.title}
                </h4>
                <div className={`flex-wrap ${css.page_section}`}>
                  <p className={css.times}>
                    <time>
                      {" "}
                      {new Date(filterdata.createdAt).toLocaleString()}
                    </time>
                  </p>
                  <p className={css.user_name}>{filterdata.userName}</p>
                  <div className={css.tags}>
                    {filterdata.tags.map((tags, idx) => (
                      <p key={idx}>{tags}</p>
                    ))}
                  </div>
                  {userID === userData[0] && (
                    <p className="ml-auto ">
                      {filterdata.isSolved ? (
                        <button
                          className="btn btn-outline-success mr-3"
                          onClick={() => handleSolvedAndUnsolved(false)}
                        >
                          solved
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-info mr-3"
                          onClick={() => handleSolvedAndUnsolved(true)}
                        >
                          Unsolved
                        </button>
                      )}

                      <button
                        className="btn btn-outline-danger"
                        onClick={handleRemoveConfirm}
                      >
                        {svg} Remove
                      </button>
                    </p>
                  )}
                </div>
              </div>
              <hr />
              <section className={css.question_wrapper}>
                <p className={css.filterdata_body}>{filterdata.body}</p>
              </section>
              <section className={css.answer_wrapper}>
                <hr />
                <h4 className={css.answer}>
                  {filterdata.answers.length === 0 ? (
                    <span>Nobody answered your post yet </span>
                  ) : (
                    <span>{filterdata.answers.length} Answer</span>
                  )}
                </h4>
                {filterdata.answers.length
                  ? filterdata.answers.map((answer) => {
                      return (
                        <Fragment key={answer._id}>
                          <section className="d-flex align-items-center">
                            <img
                              src={`https://secure.gravatar.com/avatar/${answer._id}?s=164&d=identicon`}
                              alt="users"
                              width="40px"
                            />
                            <small className="pl-2">
                              {answer.answeredUserName}
                            </small>
                            <small className={css.answer_time}>
                              <time>
                                {new Date(answer.date).toLocaleString()}
                              </time>
                            </small>
                            {answer.answeredUserID ===
                              window.localStorage
                                .getItem("userdata")
                                .split(" ")[0] && (
                              <p
                                className={css.answer_delete_dtn}
                                onClick={handleDeleteConfirm}
                              >
                                {svg} Delete
                              </p>
                            )}
                          </section>
                          <p className={css.answerquestion}>{answer.answer}</p>{" "}
                          <hr />
                          {isConfirm && (
                            <AnswerDeleteModal
                              setIsConfirm={setIsConfirm}
                              show={show}
                              handleAnswerDelete={handleAnswerDelete}
                              answerId={answer._id}
                            />
                          )}
                        </Fragment>
                      );
                    })
                  : null}

                <form>
                  <div className="form-group mt-5 form-text-field">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className={css.answer}
                    >
                      Your answer
                    </label>

                    <div className="form-group">
                      <textarea
                        required
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="10"
                        value={answer}
                        onChange={(e) => setanswer(e.target.value)}
                      ></textarea>
                    </div>
                    <div className={css.error}>{bodyError}</div>
                  </div>
                  <button
                    className={`btn my-3 ${css.btn_color}`}
                    onClick={handletextarea}
                  >
                    Post your Answer
                  </button>
                </form>
              </section>
            </div>
          );
        })}
      {isSure && (
        <DeleteModal
          setIsSure={setIsSure}
          show={show}
          handleDeletebtn={handleDeletebtn}
        />
      )}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPageInfo);
