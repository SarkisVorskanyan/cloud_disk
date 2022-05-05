import { ID } from './../../models/Types';
import { fetchFiles, uploadFile, createFoldier, downloadFile, deleteFile } from './../actions/File_action';
import { FileType } from './../../models/FIleType';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()



interface FileState {
     load: boolean,
     error: null | string,
     message: string | undefined,
     files: FileType[],
     currentDir: String | null,
     stackDir: any,
     backDir: String | null
}

const initialState: FileState = {
     load: false,
     error: null,
     message: '',
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

        //work with stack
        pushToStack: (state, action: PayloadAction<ID>) => {
            state.stackDir.push(action.payload)
        },

        popOfStack: (state) => {
            const back: ID = state.stackDir.pop()
            state.backDir = back
        },

        resetStackDir: (state) => {
            state.stackDir = []
        },

        removeFileById: (state, action: PayloadAction<ID>) => {
            state.files.splice(state.files.findIndex((file) => file._id === action.payload), 1);
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
            // return (
            //     state.files = [...state.files, action.payload]
            // )
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

        //--------
        [downloadFile.pending.type]: (state) => {
            state.load = true
        },
        [downloadFile.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = ''
        },
        [downloadFile.rejected.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = action.payload.response.data.message
        },
        //____________
        [deleteFile.pending.type]: (state) => {
            state.load = true
        },
        [deleteFile.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.load = false
            state.error = ''
            state.message = action.payload.message
            toast.success(state.message)
        },
        [deleteFile.rejected.type]: (state, action: PayloadAction<string>) => {
            state.load = false
            state.error = action.payload
            toast.error(state.error)
        },
        
    }

})

export const {resetFiles, setCurrentDir, pushToStack, popOfStack, resetStackDir, removeFileById} = FileSlice.actions

export default FileSlice.reducer;