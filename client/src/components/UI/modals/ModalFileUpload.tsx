import React, { FC, useEffect } from 'react'
import ModalHeader from './modalBlocks/ModalHeader'
import '../../../styles/componentStyles/UIStyles/modalStyles/ModalStyles.scss'
import { UploadFileProgressType } from '../../../models/UploadFIleProgressType'
import { useAppDispatch } from '../../../store/hooks/Hooks'
import { removeFileOfUploadFilesList, resetUploadFilesList } from '../../../store/reduxers/UploadFiles_reducer'

interface ModalFileUploadProps {
    closeModal: () => void,
    uploadFilesList: UploadFileProgressType[]
}

const arr = [1, 2, 3]

const ModalFileUpload: FC <ModalFileUploadProps> = ({closeModal, uploadFilesList}) => {

    const dispatch = useAppDispatch()

    const removeFile = (id: number) => {
      dispatch(removeFileOfUploadFilesList(id))
    }

    return (
        <div className='modal'>
            <div className='modal_upload_file_container'>
                <div className='modal_upload_file_subContainer'>
                    <ModalHeader positionBtn='15%' closeModal={closeModal} title={'Загрузка файлов'} />
                    <div className='files_container'>
                    {uploadFilesList.map((item, i) => 
                        <div className='file_item'>
                            <div className='file_header'>
                                <h3>{item.name}</h3>
                                <span onClick={() => removeFile(item.id)}>
                                    &#10006;
                                </span>
                            </div>
                            <div className='file_footer'>
                                <div className="progress">
                                    <p>{item.progress}%</p>
                                    <div style={{width: `${item.progress}%`}}></div>
                                </div>
                            </div>
                            
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalFileUpload