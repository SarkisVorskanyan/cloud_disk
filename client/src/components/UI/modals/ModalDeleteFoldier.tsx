import React, { FC, useEffect } from 'react'
import { ID } from '../../../models/Types'
import { deleteFile } from '../../../store/actions/File_action'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'
import '../../../styles/componentStyles/UIStyles/modalStyles/ModalStyles.scss'
import MainButton from '../buttons/MainButton'
import ModalHeader from './modalBlocks/ModalHeader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFileById } from '../../../store/reduxers/File_reducer'
toast.configure()


interface ModalDeleteFoldierProps {
    closeModal: () => void,
    idForDeletingFile: ID,
}

const ModalDeleteFoldier: FC <ModalDeleteFoldierProps> = ({closeModal, idForDeletingFile}) => {

    const dispatch = useAppDispatch()
    const {error, message} = useAppSelector(state => state.file)


    
    const removeFile = () => {
        closeModal()
        dispatch(deleteFile(idForDeletingFile))
        dispatch(removeFileById(idForDeletingFile))
        if(!error){
            toast.success(message)
        }else{
            toast.error(error)
        }
    }

    return (
        <div className='modal'>
            <div className="modal_delete_file_container">
                <ModalHeader closeModal={closeModal} title={'Удалить папку'} />
                <div>
                    <h2>Вы уверены что хотите удалить этот файл?</h2>
                </div>
                <div className='btn_container_space_around'>
                    <MainButton 
                        background="#E72831"
                        label='Да' 
                        someFunction={removeFile}
                        />
                    <MainButton 
                        background="#0078d0"
                        label='Нет' 
                        someFunction={closeModal}
                        />
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteFoldier