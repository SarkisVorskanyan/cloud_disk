import React, { FC, useEffect } from 'react'
import RegistrationForm from '../components/registrationBlock/RegistrationForm'
import HelperText from '../components/UI/helperTexts/HelperText'
import { AuthDataType } from '../models/AuthDataType'
import { login } from '../store/actions/Auth_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'

const LoginPage: FC = () => {

    const dispatch = useAppDispatch()
    const {error, message, user} = useAppSelector(state => state.auth)

    const sendData = (values: AuthDataType) => {
        dispatch(login(values))
    }

    useEffect(() => {
        console.log(error, 'error', message, 'message', user, 'user');
        
    }, [error, message, user])

    return (
        <div className='container'>
            <div>
                <HelperText message={message} error={error} />
                <RegistrationForm
                    sendData={sendData}
                    title={'Sign in'}
                    buttonText={'Login'}
                    />
            </div>
          
        </div>
        
    )
}

export default LoginPage