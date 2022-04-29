import React, { FC, useEffect, useState } from 'react'
import { fetchFiles } from '../store/actions/File_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'
import FileList from '../components/fileBlock/FileList'
import MainButton from '../components/UI/buttons/MainButton'
import ModalCreateFoldier from '../components/UI/modals/ModalCreateFoldier'
import Spinner from '../components/UI/loaders/Spinner'

const HomePage: FC = () => {

    const dispatch = useAppDispatch()
    const {files, load, error, createDir} = useAppSelector(state => state.file)
    const [openModal, setOpenModal] = useState<boolean>(false)


    useEffect(() => {
        dispatch(fetchFiles(createDir))
    }, [createDir])

    const createFoldier = () => setOpenModal(true)
    const closeModal = () => setOpenModal(false)

    return (
        <div>
            {openModal && <ModalCreateFoldier 
                                closeModal={closeModal}
                                createDir={createDir}
            />}
            {load && <Spinner />}
           <h1>Главная страница</h1>
           <div style={{marginBottom: 20}}>
               <MainButton background='#36E733' label='Создать папку' someFunction={createFoldier}  />
           </div>
           <FileList state={files} /> 
        </div>
    )
}

export default HomePage