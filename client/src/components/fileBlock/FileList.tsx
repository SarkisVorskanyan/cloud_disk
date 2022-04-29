import React, { FC, useEffect } from 'react'
import { FileType } from '../../models/FIleType'
import '../../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import emptyFolder from '../../assets/homepage/emptyFolder.png'
import fullFolder from '../../assets/homepage/fullFolder.png'
import moment from 'moment'


interface FIleListProps {
    state: FileType[]
}

const FileList: FC <FIleListProps> = ({state = []}) => {

    return (
        <div style={{paddingBottom: 40}}>
            {state.map((item, i) => 
                <div key={i} className='file_container'>
                    <div className='file_sub_container'>
                       <div className='folder_img'>
                        <img src={`${item.childs.length ? fullFolder : emptyFolder}`}  />
                        </div>
                        <div className='file_name'>
                            <p>{item.name}</p>
                        </div> 
                    </div>
                    <div className='file_sub_container'>
                        <div className='textBlock' style={{margin: '0 20px'}}>
                            <p>Дата</p>
                            <p>{moment(item.date).format('L')}</p>
                        </div>
                        <div className='textBlock'>
                            <p>Размер</p>
                            <p>{item.size}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileList