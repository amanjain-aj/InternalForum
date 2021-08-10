import React from "react";
import css from "./headerFooter.module.css";

const Footer = () => {
  return (
    <footer className={css.footer_copyright_block}>
      <span className={css.footer_copyright_text}>
        Designed and Developed by
      </span>
      <div className={css.footer_copyright}>
        <a
          href="https://www.invincix.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={css.logo_icon}>
            <img src="/images/logo.png" alt="logo" />
          </div>
        </a>
        <div className={css.copyright_icon}>
          <img src="/images/copyright.png" alt="copyright" />
        </div>
      </div>
      <span className={css.footer_copyright_text}>2021</span>
    </footer>
  );
};

export default Footer;
