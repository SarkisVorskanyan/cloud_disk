import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RegistrationForm from '../components/registrationBlock/RegistrationForm'
import HelperText from '../components/UI/helperTexts/HelperText'
import { AuthDataType } from '../models/AuthDataType'
import { registration } from '../store/actions/Auth_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'
import '../styles/pageStyles/authPageStyles/AuthPageStyles.scss'

const RegistrationPage: FC = () => {

    const {error, message, success} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const sendData = async (values: AuthDataType) => {
        await dispatch(registration(values))
        
    }

    return (
        <div className='container'>
            <div>
               <HelperText message={message} error={error} />
                <RegistrationForm 
                            sendData={sendData}
                            title={'Sign up'}
                            buttonText={'Registration'}
                    />
            </div>
            
        </div>
    )
}

export default RegistrationPage