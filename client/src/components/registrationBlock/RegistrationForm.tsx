import React, { FC } from "react";
import {Formik} from 'formik';
import MainInput from "../UI/inputs/MainInput";
import { AuthValidation } from "../../utils/validation/AuthValidation";
import MainButton from "../UI/buttons/MainButton";
import { AuthDataType } from "../../models/AuthDataType";

interface RegistrationFormProps {
    sendData: (values: AuthDataType) => void,
    title: string,
    buttonText: string

}

const RegistrationForm: FC <RegistrationFormProps> = ({sendData, title, buttonText}) => {
    const initialValues: AuthDataType = { email: '', password: '' };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={AuthValidation}
            onSubmit={ (values, action) => {
                sendData(values)
                console.log(values)
                action.resetForm()
            }}
    >
        {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue
          }) => (
              <div className="form_container">
                  <h2>{title}</h2>
                  <form onSubmit={handleSubmit}>
                      <MainInput 
                                value={values.email}
                                name='email'
                                handleChange={handleChange}
                                errors={errors.email}
                                text={'email'} />
                                
                      <MainInput 
                                value={values.password}
                                name='password'
                                handleChange={handleChange}
                                errors={errors.password}
                                text={'password'} />
                                <div className="btn_container">
                                    <MainButton background="#0078d0" someFunction={handleSubmit} label={buttonText} />
                                </div>
                  </form>
              </div>
            
        )}
    </Formik>
    )
}

export default RegistrationForm