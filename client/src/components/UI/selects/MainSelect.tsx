import React, { FC, memo } from 'react'
import { FilterType } from '../../../models/Types'
import '../../../styles/componentStyles/UIStyles/selectStyles/SelectStyles.scss'
import { FilterForFileType } from '../../../utils/data/FilterForFile'

interface MainSelectProps {
    state: FilterForFileType,
    onChangeSelect: (value: FilterType) => void
}

const MainSelect: FC <MainSelectProps> = ({state, onChangeSelect}) => {

    console.log('hiselect');
    
    return (
        <select onChange={(e) => onChangeSelect(e.target.value)} className='select'>
            <option selected disabled>{state.name}</option>
            {state.options.map((item, i) => 
                <option value={item.value} >{item.name}</option>
            )}
      </select>
    )
}

export default memo(MainSelect)