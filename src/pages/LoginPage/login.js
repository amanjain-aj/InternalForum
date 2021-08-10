import React, { Fragment } from 'react'
import LoginForm from '../../components/form/loginForm'
import css from './login.module.css'

const LoginPage = () => {
  return (
    <Fragment>
      <div className={css.login_section}>
        <img
          src='/images/login-background.jpg'
          alt='background'
          className={css.bg}
        />
        <div className={css.login_left_section}>
          <div className={css.logo_text_block}>
            <img src='/images/inviciflow.png' alt='logo' />
            <span>InvincixFlow</span>
          </div>
          <span>
            You got Questions
            <br /> We got their Answers
          </span>
          <LoginForm />
        </div>
      </div>
    </Fragment>
  )
}

export default LoginPage
