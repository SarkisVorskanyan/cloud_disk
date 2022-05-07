import React, { FC, useEffect, useRef } from 'react'
import { FileType } from '../../models/FIleType'
import '../../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import emptyFolder from '../../assets/homepage/emptyFolder.png'
import fullFolder from '../../assets/homepage/fullFolder.png'
import moment from 'moment'
import { ID } from '../../models/Types'
import { FileImage } from '../../utils/FIleImage'
import { CheckSizeFile } from '../../utils/CheckSizeFile'
import {ReactComponent as TrashSvg} from '../../assets/svg/homePageSvgBlock/trashSvg.svg'
import {ReactComponent as DownloadSvg} from '../../assets/svg/homePageSvgBlock/download.svg'
import {TransitionGroup, CSSTransition} from 'react-transition-group'



interface FIleListProps {
    state: FileType[],
    openFoldier: (id: ID, type: String) => void,
    downloadFile: (id: string, name: string) => void,
    openModalDeleteFile: () => void,
    setIdForDeleteingFile: (id: ID) => void
}

const FileList: FC <FIleListProps> = ({state = [], openFoldier, downloadFile, openModalDeleteFile, setIdForDeleteingFile}) => {


    const handleDownload = (e: React.MouseEvent<HTMLDivElement>, id: any, name: any) => { //TODO
        e.stopPropagation()
        downloadFile(id, name) 
    }

    const openModalForDeleteFile = (e: React.MouseEvent<HTMLDivElement>, id: ID) => {
        e.stopPropagation()
        setIdForDeleteingFile(id)
        openModalDeleteFile()
    }
    const nodeRef = useRef(null)


    return (
        <div style={{paddingBottom: 40}}>
            <TransitionGroup>
            {state.map((item, i) =>
            <CSSTransition
                timeout={500}
                classNames={'file'}
                nodeRef={nodeRef}
                key={i}
                exit={false}
            > 
                <div onClick={() => openFoldier(item._id, item.type)} className='file_container'>
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
                            <div onClick={(e) => openModalForDeleteFile(e, item._id)} className='icon_block'>
                                <TrashSvg />
                            </div>
                            {item.type !== 'dir' && <div onClick={(e) => handleDownload(e, item._id, item.name)} className='icon_block'>
                                <DownloadSvg />
                            </div>}
                        </div> 
                    </div>
                    
                </div>
                </CSSTransition>
            )}
            </TransitionGroup>
        </div>
    )
}

export default FileList