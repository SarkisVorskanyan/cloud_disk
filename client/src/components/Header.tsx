import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/Hooks";
import { logOut } from "../store/reduxers/Auth_reducer";
import '../styles/componentStyles/headerStyles/Header.scss'

const Header: FC = () => {
    const {error, message, user, isAuth} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logOut())
    }


    return (
        <div className="header_container">
            <div>
                <h1>Disk CLoud</h1>
            </div>
            {isAuth ? <div>
                <h1 style={{fontSize: '20px'}}>{user?.user.email}</h1>
            </div> : ''}
            <div className="navbar">
                <ul>
                    {!isAuth && <li>
                        <Link className="link" to="login">Login</Link>
                    </li>}
                    {!isAuth && <li>
                        <Link className="link" to="registration">Registration</Link>
                    </li> }
                    {isAuth && <li onClick={logout}>
                        <p className="link">Log out</p>
                    </li>}
                </ul>
            </div>
        </div>
    )
}

export default Header