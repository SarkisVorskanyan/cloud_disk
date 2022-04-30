import { ID } from './../../models/Types';
import { UploadFilesType } from './../../models/UploadFilesType';
import { NewPostType } from './../../models/NewPostType';
import { FileType } from './../../models/FIleType';
import { instance } from './../api/Api';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFiles = createAsyncThunk(
    'file/fetchFiles',
    async (createDir: String | null, thunkAPI) => {
        debugger
        try{
            const response = await instance.get<FileType[]>(`file${createDir ? '?parent=' + createDir : ''}`)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const createFoldier = createAsyncThunk(
    'file/createFoldier',
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

export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async (data: UploadFilesType, thunkAPI) => {
        const {file, parent} = data
        const formData = new FormData()
        formData.append('file', file)
        if(parent !== null){
            formData.append('parent', parent)
        }
        
        try{
           const response = await instance.post<FileType>(`/file/upload`, formData)
           return response.data
        }
        catch(e) {
           return thunkAPI.rejectWithValue(e)
        }
    }
)