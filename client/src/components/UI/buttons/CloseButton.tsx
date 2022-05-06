import React, { FC } from 'react'
import '../../../styles/componentStyles/UIStyles/btnStyles/BtnStyles.scss'

interface CloseButtonProps {
    closeModal: () => void,
    positionBtn?: string
}

const CloseButton: FC <CloseButtonProps> = ({closeModal, positionBtn = '28%'}) => {
    return (
        <div onClick={closeModal} className='close_btn_container'>
            <div style={{top: positionBtn}} className='close_btn_sub_container'>
                <span className="left">
                    <span className="circle-left"></span>
                    <span className="circle-right"></span>
                </span>
                <span className="right">
                    <span className="circle-left"></span>
                    <span className="circle-right"></span>
                </span>
            </div>
        </div>
    )
}

export default CloseButton