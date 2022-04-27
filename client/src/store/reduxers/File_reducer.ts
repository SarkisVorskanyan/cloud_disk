import { fetchFiles } from './../actions/File_action';
import { FileType } from './../../models/FIleType';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FileState {
     load: boolean,
     error: null | string,
     files: FileType[],
     createDir: String | null
}

const initialState: FileState = {
     load: false,
     error: null,
     files: [],
     createDir: null,
}

export const FileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        
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
        
    }

})

export const {} = FileSlice.actions

export default FileSlice.reducer;