import { NewPostType } from './../../models/NewPostType';
import { FileType } from './../../models/FIleType';
import { instance } from './../api/Api';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFiles = createAsyncThunk(
    'file/fetchFiles',
    async (createDir: String | null, thunkAPI) => {
        try{
            const response = await instance.get<FileType[]>(`file${createDir ? '?parent=' +createDir : ''}`)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const createPost = createAsyncThunk(
    'file/createPost',
    async (data: NewPostType, thunkAPI) => {
        debugger
        try{
            const response = await instance.post<FileType[]>(`/file`, data)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)