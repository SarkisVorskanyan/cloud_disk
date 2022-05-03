import React, { FC, useEffect, useState } from 'react'
import { downloadFile, fetchFiles, uploadFile } from '../store/actions/File_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'
import FileList from '../components/fileBlock/FileList'
import MainButton from '../components/UI/buttons/MainButton'
import ModalCreateFoldier from '../components/UI/modals/ModalCreateFoldier'
import Spinner from '../components/UI/loaders/Spinner'
import { ID } from '../models/Types'
import { popOfStack, pushToStack, setCurrentDir } from '../store/reduxers/File_reducer'
import '../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import UploadBtn from '../components/UI/buttons/UploadBtn'
import DragField from '../components/UI/dragField/DragField'
import { StopAllEvents } from '../utils/StopAllEvents'

const HomePage: FC = () => {

    const dispatch = useAppDispatch()
    const {files, load, error, currentDir, stackDir, backDir} = useAppSelector(state => state.file)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [dragView, setDragView] = useState<boolean>(false)


    useEffect(() => {
        dispatch(fetchFiles(currentDir))
    }, [currentDir])

    useEffect(() => {
        console.log(dragView, 'dragView');
        
    }, [dragView])

    const createFoldier = () => setOpenModal(true)
    const closeModal = () => setOpenModal(false)

    const openFoldier = (id: ID, type: String) => {       
            if(type === 'dir'){
                dispatch(pushToStack(currentDir))
                dispatch(setCurrentDir(id))
            } 
            
    }

    const backHandler = () => {
        dispatch(popOfStack())        
        dispatch(setCurrentDir(stackDir[stackDir.length - 1]))
    }

    const uploadFiles = (e: any) => {
       const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile({file, parent: currentDir})))        
    }

    const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
        StopAllEvents(e)
        setDragView(true)
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        StopAllEvents(e)
        setDragView(false)
    }

    const dropHandler = (e: any) => { //TODO
        StopAllEvents(e)
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile({file, parent: currentDir})))
        setDragView(false)
    }

    const downloadFileofServer = (id: any, name: any) => {
        dispatch(downloadFile({id, name}))
    }

    return (
        !dragView ?
        <div style={{height: '100vh'}} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >
            {openModal && <ModalCreateFoldier 
                                closeModal={closeModal}
                                currentDir={currentDir}
            />}
            {load && <Spinner />}
           <h1>Главная страница</h1>
           <div className='button_block'>
                {stackDir.length ? <MainButton background='#0078d0' label='Назадь' someFunction={backHandler}  /> : ''}
                <div style={{marginLeft: stackDir.length ? 20 : 0, marginRight: 20}}>
                    <MainButton background='#36E733' label='Создать папку' someFunction={createFoldier}  />
                </div>
                <UploadBtn background='#F07427' label='Загрузить файлы' someFunction={uploadFiles} />
           </div>
           <FileList  
                    state={files}
                    downloadFile={downloadFileofServer}
                    openFoldier={openFoldier} /> 
        </div>
        : 
        <DragField dragEnterHandler={dragEnterHandler}
                   dragLeaveHandler={dragLeaveHandler} 
                   dropHandler={dropHandler}
                   />
    )
}

export default HomePage