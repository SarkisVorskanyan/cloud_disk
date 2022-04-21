import { UserDataType } from './../../models/UserDataType';
import { login, registration } from './../actions/Auth_action';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { boolean } from 'yup';

interface AuthState {
    load: boolean,
    error: null | string,
    message: string,
    isAuth: boolean,
    user: UserDataType | null,
    success: boolean
}

const initialState: AuthState = {
    load: false,
    error: null,
    message: '',
    isAuth: false,
    user: null,
    success: false
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: () => initialState,
        logOut: (state) => {
            localStorage.removeItem('token')
            state.isAuth = false
        }
    },
    extraReducers: {
        [registration.pending.type]: (state) => {
            state.load = true
        },
        [registration.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.message = action.payload.message
            state.error = ''
            state.success = true
        },
        [registration.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
            state.message = action.payload.response.data.message
            state.success = false
        },
        //login
        [login.pending.type]: (state) => {
            state.load = true
        },
        [login.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.user = action.payload
            localStorage.setItem('token', action.payload.token)
            state.error = ''
            state.message = ''
            state.isAuth = true
        },
        [login.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
            state.message = action.payload.response.data.message
        },
        
    }

})

export const {resetAuth, logOut} = AuthSlice.actions

export default AuthSlice.reducer;