import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
toast.configure();

const useForm = (validation) => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [emailValues, setEmailValues] = useState({
    email: "",
  });

  const [passwordValues, setPasswordValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [forgotPasswordShow, setForgotPasswordModal] = useState(false);

  const handleClose = () => setForgotPasswordModal(false);
  const handleShow = () => setForgotPasswordModal(true);

  const handleSetPasswordFormSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(passwordValues));
  };

  const handleSetPasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordValues({
      ...passwordValues,
      [name]: value,
    });
  };

  const handleForgotPasswordFormSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(emailValues));
    if (!errors.email) {
      console.log(emailValues);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setEmailValues({
      ...emailValues,
      [name]: value,
    });
  };

  // HANDLEING LOGIN LOGIC HERE----------------------------------------------------

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors(validation(values));
    if (!errors.email && errors.password) {
      console.log(values);
    }

    // API END-POINT { /api/login }
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: values.email,
        password: values.password,
      });

      window.localStorage.setItem("authorization", res.data.token);
      window.localStorage.setItem(
        "userdata",
        `${res.data.userID} ${res.data.userName} ${res.data.token}`
      );
      history.push("/");
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // CATCH ERROR
    }
    setValues({
      email: "",
      password: "",
    });
  };

  // -------------------------------------------------------------------------

  return {
    handleChange,
    handleFormSubmit,
    values,
    emailValues,
    errors,
    forgotPasswordShow,
    handleShow,
    handleClose,
    handleForgotPasswordFormSubmit,
    handleSetPasswordFormSubmit,
    handleSetPasswordChange,
    passwordValues,
  };
};

export default useForm;
