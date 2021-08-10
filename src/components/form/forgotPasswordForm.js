import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import InputField from "./inputField";
import useForm from "./useForm";
import validation from "./validation";
import css from "./form.module.css";

const emailField = {
  id: "email",
  type: "email",
  name: "email",
  placeholder: "Email",
};
const ForgotPasswordFormModal = (props) => {
  const { handleChange, emailValues, errors, handleForgotPasswordFormSubmit } =
    useForm(validation);

  return (
    <Fragment>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={css.modal_content}>
          <Modal.Header closeButton className={css.modal_header}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className={css.modal_title}
            >
              Forgot Password
            </Modal.Title>
          </Modal.Header>
          <div className={css.message}>
            Please enter the email address to reset password
          </div>
          <Modal.Body className={css.modal_body}>
            <form>
              <label>Email</label>
              <InputField
                eachField={emailField}
                emailValue={emailValues.email}
                onChange={handleChange}
                emailError={errors.email}
              />
            </form>
          </Modal.Body>
          <div
            className={css.submit_button}
            onClick={handleForgotPasswordFormSubmit}
          >
            Submit
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ForgotPasswordFormModal;
