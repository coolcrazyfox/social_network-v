import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.scss";
import { AvatarType } from "../Dialogs/DialogsContainer";
import SidebarFriends from "../SidebarFriends/SidebarFriends";
import { NavPropsType } from "./NavContainer";
import cn from "classnames";

export const Nav: React.FC<NavPropsType> = ({friends}) => {
    let friendsElements = friends
        .map((el: AvatarType) => <SidebarFriends key={el.id} link={el.link} id={el.id}/>);

    return <nav className={s.nav}>
        <div className={s.nav_section}>
            <NavLink className={s.item} activeClassName={s.active} to="/profile">Profile</NavLink>
            <NavLink className={s.item} activeClassName={s.active} to="/dialogs">Messages</NavLink>
            <NavLink className={s.item} activeClassName={s.active} to="/users">Users</NavLink>
            <NavLink className={s.item} activeClassName={s.activeFriends} to="/friends">Friends</NavLink>
            <NavLink className={s.item} activeClassName={s.active} to="/music">Music</NavLink>
            <NavLink className={cn(s.item, s.margin)} activeClassName={s.active}
                     to="/settings">Settings</NavLink>
            <div className={s.friendsContainer}>
                {friendsElements}
            </div>
        </div>
    </nav>;
};