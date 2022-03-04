import React from "react";
import s from "./Message.module.scss";

type messagePropsType = {
    message: string
    id: number
}

const Message: React.FC<messagePropsType> = ({message}) => {
    return (
        <div>
            <span className={s.message}>{message}</span>
        </div>
    );
};

export default Message;