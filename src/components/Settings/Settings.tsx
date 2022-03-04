import React from "react";
import s from "./Settings.module.scss"
import { NavLink } from "react-router-dom";
import cn from "classnames";

type SettingsPropsType = {
    isOwner: number | null
    logout: () => void
}

export const Settings: React.FC<SettingsPropsType> = ({isOwner, logout}) => {
    return (
        <div className={s.buttonsContainer}>
            {isOwner
                ? <NavLink onClick={logout} className={s.button} to={"/login"}>Log out</NavLink>
                : <div className={s.withoutAuthorizationContainer}>
                    <span className={s.withoutAuthorizationText}>Settings are available to authorized users</span>
                    <span>
                        <NavLink to={"/login"} className={cn(s.button, s.withoutAuthorizationButton)}>Login</NavLink>
                    </span>
                </div>
            }
        </div>
    )
}