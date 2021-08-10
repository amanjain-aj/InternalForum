import React from "react";
import Navlinks from "./Navlinks";
import css from "./Sidebar.module.css";

const MobileScreen = () => {
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.display = "none";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
    document.getElementById("main").style.display = "block";
  }
  return (
    <div className={`${css.laptopscreen}`}>
      <div id="mySidenav" className={`${css.sidenav}`}>
        <span className={`${css.closebtn}`} onClick={closeNav}>
          &times;
        </span>
        <div className="text-center text-light pb-2">
          <Navlinks />
        </div>
      </div>

      <div id="main" className={`${css.main}`}>
        <span className={`${css.hamburger}`} onClick={openNav}>
          &#9776;
        </span>
      </div>
    </div>
  );
};

export default MobileScreen;
