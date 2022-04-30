import { ID } from './../../models/Types';
import { fetchFiles, uploadFile, createFoldier } from './../actions/File_action';
import { FileType } from './../../models/FIleType';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FileState {
     load: boolean,
     error: null | string,
     files: FileType[],
     currentDir: String | null,
     stackDir: any,
     backDir: String | null
}

const initialState: FileState = {
     load: false,
     error: null,
     files: [],
     currentDir: null,
     backDir: null,
     stackDir: []
}

export const FileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        resetFiles: (state) => {
            state.files = []
        },

        setCurrentDir: (state, action: PayloadAction<ID>) => {
            state.currentDir = action.payload
        },

        pushToStack: (state, action: PayloadAction<ID>) => {
            state.stackDir.push(action.payload)
        },

        popOfStack: (state) => {
            const back: ID = state.stackDir.pop()
            state.backDir = back
        }
    },
    extraReducers: {
        [fetchFiles.pending.type]: (state) => {
            state.load = true
        },
        [fetchFiles.fulfilled.type]: (state, action: PayloadAction<FileType[]>) => {
            state.load = false
            state.files = action.payload
            state.error = ''
        },
        [fetchFiles.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
        },
        //--------
        [createFoldier.pending.type]: (state) => {
            state.load = true
        },
        [createFoldier.fulfilled.type]: (state, action: PayloadAction<FileType>) => {
            state.load = false
            state.files.push(action.payload)
            state.error = ''
        },
        [createFoldier.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
        },

        //--------
        [uploadFile.pending.type]: (state) => {
            state.load = true
        },
        [uploadFile.fulfilled.type]: (state, action: PayloadAction<FileType>) => {
            state.load = false
            state.files.push(action.payload)
            state.error = ''
        },
        [uploadFile.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
        },
        
    }

})

export const {resetFiles, setCurrentDir, pushToStack, popOfStack} = FileSlice.actions

export default FileSlice.reducer;