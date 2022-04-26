import { AuthDataType } from './../../models/AuthDataType';
import { instance } from './../api/Api';
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registration = createAsyncThunk(
    'auth/registration',
    async (data: AuthDataType, thunkAPI) => {
        try{
            const response = await instance.post<any>('auth/registration', data)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data: AuthDataType, thunkAPI) => {
        try{
            const response = await instance.post<any>('auth/login', data)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const auth = createAsyncThunk(
    'auth/auth',
    async (_, thunkAPI) => {
        try{
            const response = await instance.get<AuthDataType>('auth')
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)