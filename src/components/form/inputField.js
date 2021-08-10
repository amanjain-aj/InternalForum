import React from 'react';
import css from './form.module.css';

const InputField = ({ eachField, emailValue, passwordValue, emailError, passwordError, onChange, confirmPasswordValue, confirmPasswordError }) => {

    return (
        <div className={css.input_field}>
            <input className={css.input}
                type={eachField.type}
                name={eachField.name}
                placeholder={eachField.placeholder}
                value={eachField.id === "email" ? emailValue : eachField.id === "password"
                    ? passwordValue : eachField.id === "password" ? passwordValue : confirmPasswordValue}
                onChange={onChange}
            />
            <div className={css.error}>
                {eachField.id === "email" ? emailError : eachField.id === "password" ? passwordError
                    : eachField.id === "password" ? passwordError : confirmPasswordError}
            </div>
        </div>
    )
}

export default InputField;