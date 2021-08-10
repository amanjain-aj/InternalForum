import React, { useEffect, useState } from "react";
import css from "./user.module.css";
import { connect } from "react-redux";
import { FetchUser } from "../../Redux/actionCreators";
import { Spinner } from "react-bootstrap";
import UserLists from "./UserLists";

const UserPage = ({ user, FetchUsers }) => {
  const [fetchSearch, setSearch] = useState("");

  useEffect(() => {
    FetchUsers();
  }, [FetchUsers]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // filter user
  let filterdata = user.users.filter((user) =>
    user.userName.toLowerCase().includes(fetchSearch.toLowerCase().trim())
  );

  return (
    <div className={css.user_wrapper}>
      <h4 className={css.user}>Contributors</h4>
      <div className={css.filter_field}>
        <img src="/images/search.png" alt="icon" />
        <input
          className="pl-2"
          type="search"
          placeholder="Search by contributors..."
          onChange={handleChange}
        />
      </div>
      <section className={css.user_container}>
        <div className="row">
          {user.loading ? (
            <div className="d-flex ">
              <Spinner animation="grow" />
              <Spinner animation="grow" variant="info" />
            </div>
          ) : user.error ? (
            <p>{user.error}</p>
          ) : !filterdata.length ? (
            <div className={css.notFound}>
              <img src="/images/notFound.svg" alt="not found" />
              <h5>User Not Found. Try Again</h5>
            </div>
          ) : filterdata ? (
            filterdata.map((user) => {
              return (
                <div key={user._id} className={css.user_card}>
                  <UserLists
                    userID={user._id}
                    userName={user.userName}
                    userEmail={user.email}
                  />
                </div>
              );
            })
          ) : (
            user.users.map((user) => {
              return (
                <div key={user._id}>
                  <UserLists
                    userID={user._id}
                    userName={user.userName}
                    userEmail={user.email}
                  />
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchUsers: () => dispatch(FetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
