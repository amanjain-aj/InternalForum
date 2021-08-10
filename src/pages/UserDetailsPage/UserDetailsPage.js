import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import css from "./userDetails.module.css";
import Askquestion from "./Askquestion";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const UserDetailsPage = () => {
  let { id, userName } = useParams();
  const [askQuestions, setaskQuestions] = useState();
  useEffect(() => {
    const getaskQuestions = async () => {
      let token = window.localStorage.getItem("userdata").split(" ")[2];
      const res = await axios.get(
        `http://localhost:5000/api/get/users/askquestion/${id}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      setaskQuestions(res.data);
    };
    getaskQuestions();
  }, [id]);

  return (
    <Fragment>
      <PageTitle title={`Users | ${userName} - InvincixFlow`} />
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <Fragment>
              <div className="col">
                <div className={`card ${css.avatar}`}>
                  <img
                    className="card-img-top"
                    src={`https://secure.gravatar.com/avatar/${id}?s=164&d=identicon`}
                    alt="avatar"
                  />
                  <div className="card-body">
                    <h6 className="card-title">{userName}</h6>
                  </div>
                </div>
              </div>
              <div className="col col-9 container-md mt-4 mb-4">
                <div className={css.header}>
                  <h2> Questions</h2>
                </div>
                <ul className="list-group">
                  {!askQuestions ? (
                    <p className="text-center">
                      <div className="d-flex ">
                        <Spinner animation="grow" />
                        <Spinner animation="grow" variant="info" />
                      </div>
                    </p>
                  ) : (
                    askQuestions &&
                    askQuestions.map((data) => {
                      let str = data.title;
                      str = str.replace(/\s+/g, "-").toLowerCase();
                      return (
                        <div key={data._id}>
                          <Askquestion
                            qId={data._id}
                            qtitle={str}
                            status={data.isSolved}
                            title={data.title}
                          />
                        </div>
                      );
                    })
                  )}
                </ul>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDetailsPage;
