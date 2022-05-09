import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/Hooks";
import { logOut } from "../store/reduxers/Auth_reducer";
import { resetStackDir, setCurrentDir } from "../store/reduxers/File_reducer";
import '../styles/componentStyles/headerStyles/Header.scss'
import defaultImg from '../assets/common/avatar.jpg'
import { AVATAR_URL } from "../config/Config";

const Header: FC = () => {
    const {error, message, user, isAuth} = useAppSelector(state => state.auth)
    const {stackDir} = useAppSelector(state => state.file)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const avatar = `${AVATAR_URL}${user?.user.avatar}`

    const logout = () => {
        dispatch(logOut())
    }

    const retunrHomePage = () => {
        dispatch(resetStackDir())
        dispatch(setCurrentDir(null))
    }

    const goToProfile = () => {
        navigate('/profile')
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
                    {isAuth && <li onClick={goToProfile}>
                        <img className="avatar" src={avatar ? avatar : defaultImg} alt='avatar' />
                    </li>}
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