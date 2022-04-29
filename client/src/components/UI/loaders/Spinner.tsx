import React from 'react'
import '../../../styles/componentStyles/UIStyles/loadersStyles/LoadersStyles.scss'

const Spinner = () => {
    return (
        <div className="spinner-container">
            
        <svg width="87" height="50" viewBox="0 0 87 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="loader_bars">
                <g className="upperbar">
                    <rect className="1_2" width="67" height="14" rx="7" fill="#77E7DA" />
                </g>
                <g className="middlebar">
                    <rect className="Rectangle 2" x="20" y="18" width="67" height="14" rx="7" fill="#77E7DA" />
                </g>
                <g className="bottombar">
                    <rect id="3_2" y="36" width="67" height="14" rx="7" fill="#77E7DA" />
                </g>
            </g>
        </svg>


        <p>Загрузка</p>
    </div>

    )
}

export default Spinner