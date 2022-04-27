import React, { FC, useEffect } from 'react'
import { fetchFiles } from '../store/actions/File_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'
import FileList from '../components/fileBlock/FileList'

const HomePage: FC = () => {

    const dispatch = useAppDispatch()
    const {files, load, error, createDir} = useAppSelector(state => state.file)


    useEffect(() => {
        dispatch(fetchFiles(createDir))
    }, [createDir])

    return (
        <div>
           <h1>Home page</h1>
            <FileList state={files} /> 
        </div>
        
    )
}

export default HomePage