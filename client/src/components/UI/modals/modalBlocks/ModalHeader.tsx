import React, { FC } from 'react'
import CloseButton from '../../buttons/CloseButton'
import '../../../../styles/componentStyles/UIStyles/modalStyles/ModalStyles.scss'

interface ModalHeaderProps {
    closeModal: () => void,
    title: string,
    positionBtn?: string
}

const ModalHeader: FC <ModalHeaderProps> = ({closeModal, title, positionBtn}) => {
    return (
        <div className="modal_header">
            <h3 className="title">{title}</h3>
            <CloseButton positionBtn={positionBtn} closeModal={closeModal} />
        </div>
    )
}

export default ModalHeader