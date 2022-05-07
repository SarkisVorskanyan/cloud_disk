import { FetchedFilesResponseType } from './../../models/FetchedFilesResponseType';
import { CreateUploadFIle } from './../../models/constructors/CreateUploadFile';
import { UploadFileProgressType } from './../../models/UploadFIleProgressType';
import { useAppDispatch } from './../hooks/Hooks';
import { useDispatch } from 'react-redux';
import { ID } from './../../models/Types';
import { UploadFilesType } from './../../models/UploadFilesType';
import { NewPostType } from './../../models/NewPostType';
import { FileType } from './../../models/FIleType';
import { instance } from './../api/Api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DownloadRequest } from '../../models/DownloadResponseType';
import { changeProgress, setUploadFiles, showUploadModal } from '../reduxers/UploadFiles_reducer';


export const fetchFiles = createAsyncThunk(
    'file/fetchFiles',
    async (data: FetchedFilesResponseType, thunkAPI) => {
        const {currentDir, selectedFilter} = data
        try{
            let url = ``
            if(currentDir){
                url = `?parent=${currentDir}`
            }

            if(selectedFilter){
                url = `?sort=${selectedFilter}`
            }

            if(currentDir && selectedFilter){
                url = `?parent=${currentDir}&sort=${selectedFilter}`
            }
            const response = await instance.get<FileType[]>(`file${url}`)
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
        let allUploadFiles: UploadFileProgressType = new CreateUploadFIle(Date.now(), file.name, 0)

        thunkAPI.dispatch(setUploadFiles(allUploadFiles))
        thunkAPI.dispatch(showUploadModal(true))
        
        try{
           const response = await instance.post<FileType>(`/file/upload`, formData, {
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log('total', totalLength)
                if (totalLength) {
                    let result: number = Math.round((progressEvent.loaded * 100) / totalLength)
                    allUploadFiles.progress = result
                    thunkAPI.dispatch(changeProgress(allUploadFiles))
                    console.log(allUploadFiles, 'allUploadFiles');
                    
                }
            },
           })
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
        try{
            const response = await instance.delete<ID>(`/file?id=${id}`)
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const searchFile = createAsyncThunk(
    'file/searchFile',
    async (searchName: string, thunkAPI) => {
        debugger
        try{
            const response = await instance.get<string>(`file/search?search=${searchName}`)
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

