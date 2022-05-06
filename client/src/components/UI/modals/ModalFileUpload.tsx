import React, { FC } from 'react'
import ModalHeader from './modalBlocks/ModalHeader'
import '../../../styles/componentStyles/UIStyles/modalStyles/ModalStyles.scss'
import { UploadFileProgressType } from '../../../models/UploadFIleProgressType'

interface ModalFileUploadProps {
    closeModal: () => void,
    uploadFilesList: UploadFileProgressType[]
}

const arr = [1, 2, 3]

const ModalFileUpload: FC <ModalFileUploadProps> = ({closeModal, uploadFilesList}) => {
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
                                <span>
                                    &#10006;
                                </span>
                            </div>
                            <div className='file_footer'>
                                <div className="progress">
                                    <p>{item.progress}%</p>
                                    <div style={{width: item.progress}}></div>
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