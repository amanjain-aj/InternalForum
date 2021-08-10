import React, { Fragment } from "react";
import SetPasswordForm from "../../components/form/setPassswordForm";
import css from "./setpassword.module.css";

const SetPassword = () => {
    return (
      <Fragment>
        <div className={css.setpassword_section}>
          <img
            src='/images/login-background.jpg'
            alt='background'
            className={css.bg}
          />
          <div className={css.setpassword_left_section}>
            <div className={css.logo_text_block}>
              <img src='/images/inviciflow.png' alt='logo' />
              <span>InvincixFlow</span>
            </div>
            <SetPasswordForm />
          </div>
        </div>
      </Fragment>
    )
};

export default SetPassword;