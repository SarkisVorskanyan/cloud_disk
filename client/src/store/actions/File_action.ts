import { ID } from './../../models/Types';
import { UploadFilesType } from './../../models/UploadFilesType';
import { NewPostType } from './../../models/NewPostType';
import { FileType } from './../../models/FIleType';
import { instance } from './../api/Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DownloadRequest } from '../../models/DownloadResponseType';


export const fetchFiles = createAsyncThunk(
    'file/fetchFiles',
    async (createDir: String | null, thunkAPI) => {
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
        debugger
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

export const downloadFile = createAsyncThunk(
    'file/downloadFile',
    async (data: DownloadRequest, thunkAPI) => { 
        try{
           const response = await instance.get<File>(`/file/download?id=${data.id}`,)
           const url = window.URL.createObjectURL(new Blob([response.data]));
           const link = document.createElement('a');
           link.href = url;
           link.download = data.name
           document.body.appendChild(link);
           link.click();
           link.remove()
        }
        catch(e) {
           return thunkAPI.rejectWithValue(e)
        }
    }
)

export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async (id: ID, thunkAPI) => {
        debugger
        try{
            const response = await instance.delete<ID>(`/file/?id=${id}`)
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
