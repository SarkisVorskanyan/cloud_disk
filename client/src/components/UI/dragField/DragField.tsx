import React, { FC } from "react";
import '../../../styles/componentStyles/UIStyles/UICommonStyles/UICommonStyles.scss'

interface DragFieldProps {
    dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void,
    dragEnterHandler: (e: React.DragEvent<HTMLDivElement>) => void,
    dropHandler: (e: React.DragEvent<HTMLDivElement>) => void,
}

const DragField: FC <DragFieldProps> = ({dragEnterHandler, dragLeaveHandler, dropHandler}) => {
    return (
        <div onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}  className="drag_container">
            <h1>Перетащите файлы сюда</h1>
        </div>
    )
}

export default DragField