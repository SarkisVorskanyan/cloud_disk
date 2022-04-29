import React, { FC, useEffect, useState } from "react";
import { createPost } from "../../../store/actions/File_action";
import { useAppDispatch } from "../../../store/hooks/Hooks";
import '../../../styles/componentStyles/UIStyles/modalStyles/ModalStyles.scss'
import CloseButton from "../buttons/CloseButton";
import MainButton from "../buttons/MainButton";
import MainInput from "../inputs/MainInput";
import ModalHeader from "./modalBlocks/ModalHeader";

interface ModalCreateFoldierProps {
    closeModal: () => void,
    createDir: String | null
}

const ModalCreateFoldier: FC <ModalCreateFoldierProps> = ({closeModal, createDir}) => {

    const [foldierName, setFoldierName] = useState<string>('')
    const dispatch = useAppDispatch()

    const changeValue = (e: any) => {
        setFoldierName(e.target.value)
    }

    const createNewPost = () => {
        if(foldierName !== ''){
            dispatch(createPost({
                name: foldierName,
                type: 'dir',
                parent: createDir
            }))
            closeModal()
        }
    }



    return (
            <div onClick={closeModal} className="modal">
                <div onClick={(e) => e.stopPropagation()} className="modal_container">
                    <ModalHeader closeModal={closeModal} title={'Создать папку'} />
                    <div className="modal_content">
                        <MainInput text="Имя папки"
                                   handleChange={changeValue}
                                   value={foldierName}
                        />
                    </div>
                    <div className="modal_footer">
                        <MainButton 
                                   background="#0078d0"
                                   label='Создать' 
                                   someFunction={createNewPost}
                                    />
                    </div>
                </div>
        </div>        
    )
}

export default ModalCreateFoldier