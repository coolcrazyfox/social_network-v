import React from "react";
import s from "./SidebarFriends.module.scss";

type SidebarFriendsPropsType = {
    id: number
    link: string
}

const SidebarFriends: React.FC<SidebarFriendsPropsType> = ({link}) => {
    return (
        <div className={s.avatarContainer}>
            <img className={s.avatar} src={link} alt="User avatar"/>
        </div>
    );
};

export default SidebarFriends;