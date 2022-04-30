import React, { FC } from 'react'
import '../../../styles/componentStyles/UIStyles/btnStyles/BtnStyles.scss'

interface UploadBtnProps {
    label: string
    someFunction: (e: React.ChangeEvent<HTMLInputElement>) => void,
    background: string
}

const UploadBtn: FC <UploadBtnProps> = ({background, someFunction, label}) => {
    return (
        <div className='uploadCOntainer'>
            <label htmlFor='input' style={{background}} className='main_button'>{label}</label>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => someFunction(e)} multiple type={'file'} id='input' />
        </div>
    )
}

export default UploadBtn