import React from "react";
import s from "./Post.module.scss";
import AnonymousUserPhoto from "../../../../assets/images/user.png";

export type PostType = {
    message: string
    likesCount: number
    userAvatar: string | null | undefined,
}

export const Post: React.FC<PostType> = ({message, likesCount, userAvatar}) => {
    return (
        <div className={s.post}>
            <div className={s.avatar}>
                <img
                    src={userAvatar || AnonymousUserPhoto}
                    alt="user avatar"/>
            </div>
            <div className={s.textBlock}>
                <p className={s.userMessage}>{message}</p>
                <div className={s.likesWrapper}>
                    <span>likes: <span className={s.likesCount}>{likesCount}</span></span>
                </div>
            </div>
        </div>
    )
}