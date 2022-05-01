import React, { FC, useEffect, useState } from 'react'
import { fetchFiles, uploadFile } from '../store/actions/File_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'
import FileList from '../components/fileBlock/FileList'
import MainButton from '../components/UI/buttons/MainButton'
import ModalCreateFoldier from '../components/UI/modals/ModalCreateFoldier'
import Spinner from '../components/UI/loaders/Spinner'
import { ID } from '../models/Types'
import { popOfStack, pushToStack, setCurrentDir } from '../store/reduxers/File_reducer'
import '../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import UploadBtn from '../components/UI/buttons/UploadBtn'

const HomePage: FC = () => {

    const dispatch = useAppDispatch()
    const {files, load, error, currentDir, stackDir, backDir} = useAppSelector(state => state.file)
    const [openModal, setOpenModal] = useState<boolean>(false)


    useEffect(() => {
        dispatch(fetchFiles(currentDir))
    }, [currentDir])

    const createFoldier = () => setOpenModal(true)
    const closeModal = () => setOpenModal(false)

    const openFoldier = (id: ID) => {        
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(id))
    }

    const backHandler = () => {
        dispatch(popOfStack())        
        dispatch(setCurrentDir(stackDir[stackDir.length - 1]))
    }

    const uploadFiles = (e: any) => {
       const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile({file, parent: currentDir})))        
    }

    return (
        <div>
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
           <FileList state={files} openFoldier={openFoldier} /> 
        </div>
    )
}

export default HomePage