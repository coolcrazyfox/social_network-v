import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import { HeaderPropsType } from "./HeaderContainer";
import logo from '../../assets/images/logo-lambo.png'
import AnonymousUserPhoto from "../../assets/images/user.png";
import Button from "../common/Button/Button";

export const Header: React.FC<HeaderPropsType> = ({isAuth, login, logout, profileSmallPhoto}) => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <img
                    src={logo}
                    alt="social network logo"
                    className={s.logo}
                />

                <div>
                    {isAuth ?
                        <div className={s.infoContainer}>
                            <span className={s.login}>{login}</span>
                            <div className={s.avatar}>
                                <img
                                    src={profileSmallPhoto || AnonymousUserPhoto}
                                    alt="you small avatar"/>
                            </div>
                            <Button className={s.button}>
                                <NavLink onClick={logout} to={"/login"}>Log out</NavLink>
                            </Button>
                        </div>
                        : <Button className={s.button}>
                            <NavLink to={"/login"}>Login</NavLink>
                        </Button>}
                </div>
            </div>
        </header>
    )
}