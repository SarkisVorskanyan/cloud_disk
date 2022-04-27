import React, { FC, useEffect } from 'react'
import { FileType } from '../../models/FIleType'
import '../../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import emptyFolder from '../../assets/homepage/emptyFolder.png'
import fullFolder from '../../assets/homepage/fullFolder.png'


interface FIleListProps {
    state: FileType[]
}

const FileList: FC <FIleListProps> = ({state}) => {

    useEffect(() => {
        console.log(state[0].date);
        
    },[state])

    return (
        <div>
            {state.map((item, i) => 
                <div key={i} className='file_container'>
                    <div>
                       <div className='folder_img'>
                        <img src={`${item.childs.length ? fullFolder : emptyFolder}`}  />
                        </div>
                        <div className='file_name'>
                            <p>{item.name}</p>
                        </div> 
                    </div>
                    <div>
                        <div>
                            <p>Date</p>
                            <p>.moment(item.date).format('L')</p>
                        </div>
                        <div>
                            <p>Size</p>
                            {/* <p>{item.size}</p> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileList