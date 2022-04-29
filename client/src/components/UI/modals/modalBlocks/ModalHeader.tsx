import React, { FC } from 'react'
import CloseButton from '../../buttons/CloseButton'
import '../../../../styles/componentStyles/UIStyles/modalStyles/ModalStyles.scss'

interface ModalHeaderProps {
    closeModal: () => void,
    title: string
}

const ModalHeader: FC <ModalHeaderProps> = ({closeModal, title}) => {
    return (
        <div className="modal_header">
            <h3 className="title">{title}</h3>
            <CloseButton closeModal={closeModal} />
        </div>
    )
}

export default ModalHeader