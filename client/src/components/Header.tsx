import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/Hooks";
import { logOut } from "../store/reduxers/Auth_reducer";
import { resetStackDir, setCurrentDir } from "../store/reduxers/File_reducer";
import '../styles/componentStyles/headerStyles/Header.scss'

const Header: FC = () => {
    const {error, message, user, isAuth} = useAppSelector(state => state.auth)
    const {stackDir} = useAppSelector(state => state.file)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logOut())
    }

    const retunrHomePage = () => {
        dispatch(resetStackDir())
        dispatch(setCurrentDir(null))
    }


    return (
        <div className="header_container">
            <div className="header_sub_container">
            <div style={{cursor: 'pointer'}} onClick={retunrHomePage}>
                <h1>Disk CLoud</h1>
            </div>
            {isAuth ? <div>
                <h1 style={{fontSize: '20px'}}>{user?.user.email}</h1>
            </div> : ''}
            <div className="navbar">
                <ul>
                    {!isAuth && <li>
                        <Link className="link" to="login">Логин</Link>
                    </li>}
                    {!isAuth && <li>
                        <Link className="link" to="registration">Регистрация</Link>
                    </li> }
                    {isAuth && <li onClick={logout}>
                        <p className="link">Выход</p>
                    </li>}
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Header