import React, { FC } from 'react'
import '../../../styles/componentStyles/UIStyles/btnStyles/BtnStyles.scss'

interface MainButtonProps {
    label: string
    someFunction: () => void
}

const MainButton: FC <MainButtonProps> = ({label, someFunction}) => {
    return (
        <button type="button" onClick={() => someFunction()} className='main_button'>{label}</button>
    )
}

export default MainButton