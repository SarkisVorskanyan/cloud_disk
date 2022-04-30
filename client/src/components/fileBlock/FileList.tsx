import React, { FC, useEffect } from 'react'
import { FileType } from '../../models/FIleType'
import '../../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import emptyFolder from '../../assets/homepage/emptyFolder.png'
import fullFolder from '../../assets/homepage/fullFolder.png'
import fileImage from '../../assets/homepage/file.png'
import moment from 'moment'
import { ID } from '../../models/Types'
import { FileImage } from '../../utils/FIleImage'


interface FIleListProps {
    state: FileType[],
    openFoldier: (id: ID) => void
}

const FileList: FC <FIleListProps> = ({state = [], openFoldier}) => {



    return (
        <div style={{paddingBottom: 40}}>
            {state.map((item, i) => 
                <div onClick={() => openFoldier(item.type === 'dir' ? item._id : '')} key={i} className='file_container'>
                    <div className='file_sub_container'>
                       <div className='folder_img'>
                            <img src={`${item.type !== 'dir' ? FileImage(item.type) : item.childs.length ? fullFolder : emptyFolder}`}  />
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