import React, { FC } from 'react'
import RegistrationForm from '../components/registrationBlock/RegistrationForm'
import '../styles/pageStyles/registrationPageStyles/RegistrationPageStyles.scss'

const RegistrationPage: FC = () => {
    return (
        <div className='container'>
            <RegistrationForm />
        </div>
    )
}

export default RegistrationPage