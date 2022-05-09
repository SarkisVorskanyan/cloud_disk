import { UserType } from './../../models/UserDataType';
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

export const createAvatar = createAsyncThunk(
    'auth/createAvatar',
    async (data: Object, thunkAPI) => {
        try{
            const response = await instance.post<File>(`file/avatar`, data)
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const deleteAvatar = createAsyncThunk(
    'auth/createAvatar',
    async (_, thunkAPI) => {
        debugger
        try{
            const response = await instance.delete<UserType>(`file/avatar`)
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)