import { UserDataType } from './../../models/UserDataType';
import { login, registration } from './../actions/Auth_action';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { boolean } from 'yup';

interface AuthState {
    load: boolean,
    error: null | string,
    message: string,
    auth: boolean,
    user: UserDataType | {},
    success: boolean
}

const initialState: AuthState = {
    load: false,
    error: null,
    message: '',
    auth: false,
    user: {},
    success: false
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: () => initialState,
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
            state.error = ''
            state.message = ''
        },
        [login.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
            state.message = action.payload.response.data.message
        },
        
    }

})

export const {resetAuth} = AuthSlice.actions

export default AuthSlice.reducer;