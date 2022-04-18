import React, { FC } from "react";
import '../styles/componentStyles/headerStyles/Header.scss'

const Header: FC = () => {
    return (
        <div className="header_container">
            <div>
                <h1>Disk CLoud</h1>
            </div>
            <div className="navbar">
                <ul>
                    <li>
                        <a>Login</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header