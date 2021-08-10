import React, { useState } from "react";
import css from "./headerFooter.module.css";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
const Header = () => {
  const [navBar, setNavBar] = useState(false);
  let token = window.localStorage.getItem("authorization");

  const changeHeaderShadow = () => {
    if (window.scrollY >= 70) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  window.addEventListener("scroll", changeHeaderShadow);

  const handleLogout = () => {
    window.localStorage.removeItem("authorization");
    window.location.reload();
  };
  const userName = window.localStorage.getItem("userdata").split(" ")[1];
  const userId = window.localStorage.getItem("userdata").split(" ")[0];
  return (
    <header className={css.header_section}>
      <div
        className={navBar ? `${css.nav_bar} ${css.active}` : `${css.nav_bar}`}
      >
        <div className={css.navbar_container}>
          <a href="/" target="_self" className={css.logo_name_block}>
            <img src="/images/inviciflow.png" alt="logo" />
            <span>InvincixFlow</span>
          </a>

          <div className={css.btn_group}>
            <div className={`btn ${css.ask_question_btn}`}>
              <Link to="/askquestion" className={css.btn_links}>
                Ask Question
              </Link>
            </div>
            {!token ? (
              <Link to="/login" className={`btn ${css.login_btn}`}>
                Log in &#8594;
              </Link>
            ) : (
              <DropdownButton
                id="dropdown-item-button"
                className={css.dropdown}
                title={`${
                  window.localStorage.getItem("userdata").split(" ")[1]
                }`}
              >
                <Dropdown.Item href={`/users/${userId}/${userName}`}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item href="/setpassword">
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </DropdownButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
