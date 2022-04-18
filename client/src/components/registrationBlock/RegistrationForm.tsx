import React, { FC } from "react";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';

  interface formValues {
      email: string | undefined,
      password: string | undefined
  }
  

const RegistrationForm: FC = () => {
    const initialValues: formValues = { email: '', password: '' };
    return (
        <Formik
            initialValues={initialValues}
            //validationSchema={AuthValidation}
            onSubmit={  (values) => {
                console.log(values)
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
            <form onSubmit={handleSubmit}>
               <input value={values.email} name='email' onChange={handleChange} />
               <button onClick={() => handleSubmit} />
            </form>
        )}
    </Formik>
    )
}

export default RegistrationForm