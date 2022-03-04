import React from "react";
import s from "./User.module.scss";
import anonymousUserPhoto from "../../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../redux/reducers/usersReducer";
import Button from "../../common/Button/Button";

export type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
    isOwner: number | null
}

export let User: React.FC<UserPropsType> = ({user, follow, unFollow, followingInProgress, isOwner}) => {
    return <div className={s.container}>
        <div className={s.userContainer}>
            <div>
                <NavLink to={"/profile/" + user.id}>
                    <img className={s.avatar}
                         src={user.photos.small != null
                             ? user.photos.small
                             : anonymousUserPhoto}
                         alt="User avatar"/>
                </NavLink>
            </div>
            {isOwner &&
            <div>
                {user.followed
                    ? <Button disabled={followingInProgress.some((id: number) => id === user.id)}
                              className={s.button}
                              onClick={() => {unFollow(user.id)}}>Unfollow</Button>
                    : <Button disabled={followingInProgress.some((id: number) => id === user.id)}
                              className={s.button}
                              onClick={() => {follow(user.id)}}>Follow</Button>
                }
            </div>
            }
            <div>
                <div>
                    <div className={s.name}>{user.name}</div>
                    <div className={s.status}>{user.status}</div>
                </div>
            </div>
        </div>
    </div>
}