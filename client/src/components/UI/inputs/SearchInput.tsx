import React, { FC, memo } from 'react'
import '../../../styles/componentStyles/UIStyles/inputStyles/InputStyles.scss'

export interface SearchInputProps {
    searchHandler: (e: string) => void,
    value: string
}

const SearchInput: FC <SearchInputProps> = ({searchHandler, value}) => {
    console.log('hi searchinput');
    
    return (
        <div className='search_input_container'>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchHandler(e.target.value)} 
                    value={value}
                    className=''
                    type={'search'}
                    placeholder='Поиск...' />
        </div>

        
    )
}

export default memo(SearchInput)