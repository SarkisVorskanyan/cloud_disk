import { UserDataType, UserType } from './../../models/UserDataType';
import { login, registration, auth, createAvatar, deleteAvatar } from './../actions/Auth_action';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


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
        resetAuth: (state) => {
            state.message = ''
            state.error = ''
        },
        logOut: (state) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.user = null
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
        [login.fulfilled.type]: (state, action: PayloadAction<UserDataType>) => {
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

        //check auth
        [auth.pending.type]: (state) => {
            state.load = true
        },
        [auth.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.user = action.payload
            localStorage.setItem('token', action.payload.token)
            state.isAuth = true
        },
        [auth.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
            state.message = action.payload.response.data.message
        },

        //________________
        [createAvatar.pending.type]: (state) => {
            state.load = true
        },
        [createAvatar.fulfilled.type]: (state, action: PayloadAction<UserDataType>) => {
            state.load = false
            state.user = action.payload
            state.error = ''
            state.message = ''
        },
        [createAvatar.rejected.type]: (state, action: PayloadAction<string>) => {
            state.load = false
            state.error = action.payload
            toast.error(state.error)
        },

         //________________
         [deleteAvatar.pending.type]: (state) => {
            state.load = true
        },
        [deleteAvatar.fulfilled.type]: (state, action: PayloadAction<UserDataType>) => {
            state.load = false
            state.user = action.payload
            toast.success(state.success)
        },
        [deleteAvatar.rejected.type]: (state, action: PayloadAction<string>) => {
            state.load = false
            state.error = action.payload
            toast.error(state.error)
        },
        
    }

})

export const {resetAuth, logOut} = AuthSlice.actions

export default AuthSlice.reducer;