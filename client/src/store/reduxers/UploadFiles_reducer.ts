import { UploadFileProgressType } from './../../models/UploadFIleProgressType';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ID } from '../../models/Types';




interface UploadFilesState {
     isVisible: boolean,
     uploadFilesList: UploadFileProgressType[]
}

const initialState: UploadFilesState = {
    isVisible: false,
    uploadFilesList: []
}

export const UploadFileSlice = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
        showUploadModal: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload
        },

        setUploadFiles: (state, action: PayloadAction<UploadFileProgressType>) => {
            state.uploadFilesList.push(action.payload)
        },

        changeProgress: (state, action: PayloadAction<UploadFileProgressType>) => {
            state.uploadFilesList.map(file => file.id === action.payload.id
                ? file.progress = action.payload.progress
                : ''
                )  
        },

        removeFileOfUploadFilesList: (state, action: PayloadAction<number>) => {
            state.uploadFilesList.splice(state.uploadFilesList.findIndex((file => file.id === action.payload), 1))
        },

        resetUploadFilesList: (state) => {
            state.uploadFilesList.length = 0
        },
    },
    extraReducers: {
        
    }

})

export const {showUploadModal, setUploadFiles, changeProgress, resetUploadFilesList, removeFileOfUploadFilesList} = UploadFileSlice.actions

export default UploadFileSlice.reducer;