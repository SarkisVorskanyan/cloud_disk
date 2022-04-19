import React, { FC } from 'react'
import '../../../styles/componentStyles/UIStyles/inputStyles/InputStyles.scss'

interface MainInputProps {
    value: string | undefined,
    name: string,
    handleChange: (e: React.ChangeEvent<any>) => void,
    text: string,
    errors: any

}

const MainInput: FC <MainInputProps> = ({value, name, handleChange, text, errors}) => {
    return (
        <div className='input_cntainer'>
            <label>{text}</label>
            <input 
                   className='input'
                   placeholder={text}
                   value={value}
                   name={name}
                   onChange={handleChange} />
                   <p>{errors}</p>
        </div>
        
    )
}

export default MainInput

// value={values.email} name='email' onChange={handleChange}