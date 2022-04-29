import React, { FC } from 'react'
import '../../../styles/componentStyles/UIStyles/btnStyles/BtnStyles.scss'

interface CloseButtonProps {
    closeModal: () => void
}

const CloseButton: FC <CloseButtonProps> = ({closeModal}) => {
    return (
        <div onClick={closeModal} className='close_btn_container'>
            <div className='close_btn_sub_container'>
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