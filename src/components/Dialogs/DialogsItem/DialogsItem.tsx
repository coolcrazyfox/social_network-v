import React from "react";
import { NavLink } from "react-router-dom";
import s from "./DialogsItem.module.scss";

type DialogItemPropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<DialogItemPropsType> = ({id, name}) => {
    let path = "/dialogs/" + id;
    return (
        <NavLink to={path} activeClassName={s.active} className={s.dialog}>
            {name}
        </NavLink>
    );
};

export default DialogItem;