import {combineReducers, configureStore} from "@reduxjs/toolkit";
import Auth_reducer from "./reduxers/Auth_reducer";
import File_reducer from "./reduxers/File_reducer";

const rootReducer = combineReducers({
    auth: Auth_reducer,
    file: File_reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type rootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']