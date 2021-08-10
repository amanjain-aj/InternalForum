import React, { Fragment } from 'react'
import InputField from './inputField'
import useForm from './useForm'
import validation from './validation'
import css from './form.module.css'

const setPasswordFields = [
  {
    id: 'password',
    type: 'password',
    name: 'password',
    placeholder: 'New Password',
  },
  {
    id: 'confirmPassword',
    type: 'password',
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
  },
]

const SetPasswordForm = () => {
  const {
    handleSetPasswordChange,
    handleSetPasswordFormSubmit,
    passwordValues,
    errors,
  } = useForm(validation)

  return (
    <Fragment>
      <form className={css.form}>
        {setPasswordFields &&
          setPasswordFields.map((eachField, index) => {
            return (
              <InputField
                eachField={eachField}
                key={index}
                passwordValue={passwordValues.password}
                confirmPasswordValue={passwordValues.confirmPassword}
                passwordError={errors.password}
                confirmPasswordError={errors.confirmPassword}
                onChange={handleSetPasswordChange}
              />
            )
          })}

        <div
          className={css.login_submit_button}
          onClick={handleSetPasswordFormSubmit}
        >
          Submit
        </div>
        <strong className='text-danger' style={{ fontSize: '12px' }}>
          password must be 6 characters , Including one letter & numbers
        </strong>
      </form>
    </Fragment>
  )
}

export default SetPasswordForm
