import React, { FC } from 'react'
import '../../../styles/componentStyles/UIStyles/btnStyles/BtnStyles.scss'

interface UploadBtnProps {
    label: string
    someFunction: (e: React.ChangeEvent<HTMLInputElement>) => void,
    background: string
    letMultiple?: boolean
    acceptImg?: string
}

const UploadBtn: FC <UploadBtnProps> = ({background, someFunction, label, letMultiple = true, acceptImg}) => {
    return (
        <div className='uploadContainer'>
            <label htmlFor='input' style={{background}} className='main_button'>{label}</label>
            <input className='upload_input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => someFunction(e)} multiple={letMultiple} accept={acceptImg} type={'file'} id='input' />
        </div>
    )
}

export default UploadBtn