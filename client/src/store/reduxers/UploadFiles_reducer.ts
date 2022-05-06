import { UploadFileProgressType } from './../../models/UploadFIleProgressType';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";




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
                ? {...file, progress: action.payload.progress }
                : {...file }
                )
        },
    },
    extraReducers: {
        
    }

})

export const {showUploadModal, setUploadFiles, changeProgress} = UploadFileSlice.actions

export default UploadFileSlice.reducer;