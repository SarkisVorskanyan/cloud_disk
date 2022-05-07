import React, { FC, useCallback, useEffect, useState } from 'react'
import { downloadFile, fetchFiles, searchFile, uploadFile } from '../store/actions/File_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'
import FileList from '../components/fileBlock/FileList'
import MainButton from '../components/UI/buttons/MainButton'
import ModalCreateFoldier from '../components/UI/modals/ModalCreateFoldier'
import Spinner from '../components/UI/loaders/Spinner'
import { FilterType, ID } from '../models/Types'
import { popOfStack, pushToStack, setCurrentDir } from '../store/reduxers/File_reducer'
import '../styles/pageStyles/homePageStyles/HomePageStyles.scss'
import UploadBtn from '../components/UI/buttons/UploadBtn'
import DragField from '../components/UI/dragField/DragField'
import { StopAllEvents } from '../utils/StopAllEvents'
import ModalDeleteFoldier from '../components/UI/modals/ModalDeleteFoldier'
import ModalFileUpload from '../components/UI/modals/ModalFileUpload'
import { resetUploadFilesList, showUploadModal } from '../store/reduxers/UploadFiles_reducer'
import MainSelect from '../components/UI/selects/MainSelect'
import { FilterForFile } from '../utils/data/FilterForFile'
import SearchInput from '../components/UI/inputs/SearchInput'


const HomePage: FC = () => {

    const dispatch = useAppDispatch()
    const {files, load, error, currentDir, stackDir, backDir} = useAppSelector(state => state.file)
    const {isVisible, uploadFilesList} = useAppSelector(state => state.uploadFile)
    const [openCreateFileModal, setOpenCreateFileModal] = useState<boolean>(false)
    const [openDeleteFileModal, setOpenDeleteFileModal] = useState<boolean>(false)
    const [idForDeletingFile, setIdForDeleteingFile] = useState<ID>(null)
    const [dragView, setDragView] = useState<boolean>(false)
    const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchTimeout, setSearchTimeout] = useState<any>(false)


    useEffect(() => {
        dispatch(fetchFiles({currentDir, selectedFilter}))
    }, [currentDir, selectedFilter])


    const searchHandler = useCallback((value: string) => {
         setSearchValue(value)
        if(searchTimeout !== false){
            clearTimeout(searchTimeout)
        }
        
        setSearchTimeout(setTimeout((value) => {
            dispatch(searchFile(value))
        }, 500, value))
    }, [])


    //Work with modals
    const openCreateFoldierModal = () => setOpenCreateFileModal(true)
    const closeCreateFoldierModal = () => setOpenCreateFileModal(false)

    const openModalDeleteFile = () => setOpenDeleteFileModal(true)
    const closeDeleteFileModal = () => {
        setIdForDeleteingFile(null)
        setOpenDeleteFileModal(false)
    }

    const closeModalUpload = () => {
        dispatch(showUploadModal(false))
        dispatch(resetUploadFilesList())
    }
    //_____________

    const openFoldier = useCallback((id: ID, type: String) => {  //TODO useCallback font work
        if(type === 'dir'){
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(id))
        } 
    }, [currentDir])

    //navigate in files
    const backHandler = useCallback(() => {     //TODO useCallback font work
        dispatch(popOfStack())        
        dispatch(setCurrentDir(stackDir[stackDir.length - 1]))
    }, [currentDir])

    const uploadFiles = (e: any) => {
       const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile({file, parent: currentDir})))        
    }

    //drag and drop files 
    const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
        StopAllEvents(e)
        setDragView(true)
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        StopAllEvents(e)
        setDragView(false)
    }

    const dropHandler = (e: any) => { //TODO
        StopAllEvents(e)
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile({file, parent: currentDir})))
        setDragView(false)
    }
    //____________________

    const downloadFileofServer = (id: string, name: string) => {
        dispatch(downloadFile({id, name}))
    }

    return (
        !dragView ?
        <div style={{height: '100vh'}} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >
            {openCreateFileModal && <ModalCreateFoldier 
                                closeModal={closeCreateFoldierModal}
                                currentDir={currentDir}
            />}
            {openDeleteFileModal && <ModalDeleteFoldier 
                                idForDeletingFile={idForDeletingFile}
                                closeModal={closeDeleteFileModal}
            />}
            {isVisible && <ModalFileUpload 
                                 closeModal={closeModalUpload}
                                 uploadFilesList={uploadFilesList}
            />}
            {load && <Spinner />}
           <h1>Главная страница</h1>
           <div className='button_block'>
               <div className='button_block_first_block'>
                   {stackDir.length ? <MainButton background='#0078d0' label='Назадь' someFunction={backHandler}  /> : ''}
                    <div style={{marginLeft: stackDir.length ? 20 : 0, marginRight: 20}}>
                        <MainButton background='#36E733' label='Создать папку' someFunction={openCreateFoldierModal}  />
                    </div>
                    <UploadBtn background='#F07427' label='Загрузить файлы' someFunction={uploadFiles} />
               </div>
                <div className='button_block_last_block'>
                    <SearchInput value={searchValue} searchHandler={searchHandler} />
                    <MainSelect onChangeSelect={setSelectedFilter} state={FilterForFile} />
                </div>
           </div>
           <FileList  
                    state={files}
                    downloadFile={downloadFileofServer}
                    openModalDeleteFile={openModalDeleteFile}
                    setIdForDeleteingFile={setIdForDeleteingFile}
                    openFoldier={openFoldier} /> 
        </div>
        : 
        <DragField dragEnterHandler={dragEnterHandler}
                   dragLeaveHandler={dragLeaveHandler} 
                   dropHandler={dropHandler}
                   />
    )
}

export default HomePage