import React, { FC } from 'react'
import '../../../styles/componentStyles/UIStyles/btnStyles/BtnStyles.scss'

interface MainButtonProps {
    label: string
    someFunction: () => void,
    background: string
}

const MainButton: FC <MainButtonProps> = ({label, someFunction, background}) => {
    return (
        <button style={{background}} type="button" onClick={() => someFunction()} className='main_button'>{label}</button>
    )
}

export default MainButton