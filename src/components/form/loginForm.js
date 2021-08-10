import React, { Fragment } from "react";
import InputField from "./inputField";
import useForm from "./useForm";
import validation from "./validation";
import ForgotPasswordFormModal from "./forgotPasswordForm";
import css from "./form.module.css";

const loginFields = [
  {
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Email id",
  },
  {
    id: "password",
    type: "password",
    name: "password",
    placeholder: "Password",
  },
];

const LoginForm = () => {
  const {
    handleChange,
    handleFormSubmit,
    values,
    errors,
    handleShow,
    handleClose,
    forgotPasswordShow,
  } = useForm(validation);

  return (
    <Fragment>
      <form className={css.form}>
        {loginFields &&
          loginFields.map((eachField, index) => {
            return (
              <InputField
                eachField={eachField}
                key={index}
                emailValue={values.email}
                passwordValue={values.password}
                onChange={handleChange}
                emailError={errors.email}
                passwordError={errors.password}
              />
            );
          })}
        <div className={css.login_submit_button} onClick={handleFormSubmit}>
          LOGIN
        </div>
      </form>

      <div className={css.forgot_password} onClick={handleShow}>
        Forgot Password?
      </div>
      <ForgotPasswordFormModal show={forgotPasswordShow} onHide={handleClose} />
    </Fragment>
  );
};

export default LoginForm;
