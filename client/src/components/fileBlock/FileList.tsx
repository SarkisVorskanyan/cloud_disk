import React, { FC, useEffect } from 'react'
import { FileType } from '../../models/FIleType'
import '../../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import emptyFolder from '../../assets/homepage/emptyFolder.png'
import fullFolder from '../../assets/homepage/fullFolder.png'
import fileImage from '../../assets/homepage/file.png'
import moment from 'moment'
import { ID } from '../../models/Types'
import { FileImage } from '../../utils/FIleImage'
import { CheckSizeFile } from '../../utils/CheckSizeFile'
import {ReactComponent as TrashSvg} from '../../assets/svg/homePageSvgBlock/trashSvg.svg'
import {ReactComponent as DownloadSvg} from '../../assets/svg/homePageSvgBlock/download.svg'



interface FIleListProps {
    state: FileType[],
    openFoldier: (id: ID, type: String) => void,
    downloadFile: (id: String, name: String) => void
}

const FileList: FC <FIleListProps> = ({state = [], openFoldier, downloadFile}) => {


    const handleDownload = (e: React.MouseEvent<HTMLDivElement>, id: String, name: String) => {
        e.stopPropagation()
        downloadFile(id, name) 
    }


    return (
        <div style={{paddingBottom: 40}}>
            {state.map((item, i) => 
                <div onClick={() => openFoldier(item._id, item.type)} key={i} className='file_container'>
                    <div className='file_sub_container'>
                       <div className='folder_img'>
                            <img src={`${item.type !== 'dir' ? FileImage(item.type) : item.childs.length ? fullFolder : emptyFolder}`}  />
                        </div>
                        <div className='file_name'>
                            <p>{item.name}</p>
                        </div> 
                    </div>
                    <div className='file_sub_container'>
                       <div className='file_info_block'>
                        <div className='textBlock' style={{margin: '0 20px'}}>
                            <p>Дата</p>
                            <p>{moment(item.date).format('L')}</p>
                        </div>
                        <div className='textBlock'>
                            <p>Размер</p>
                            <p>{CheckSizeFile(item.size)}</p>
                        </div>
                        </div>
                        <div className='file_icons_container'>
                            <div className='icon_block'>
                                <TrashSvg />
                            </div>
                            {item.type !== 'dir' && <div onClick={(e) => handleDownload(e, item._id, item.name)} className='icon_block'>
                                <DownloadSvg />
                            </div>}
                        </div> 
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default FileList