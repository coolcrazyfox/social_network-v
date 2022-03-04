import React from "react";
import s from "./Friend.module.scss";
import anonymousFriendPhoto from "../../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import { FriendType } from "../../../redux/reducers/friendsReducer";
import Button from "../../common/Button/Button";

type FriendPropsType = {
    friend: FriendType
    follow: (friendId: number) => void
    unFollow: (friendId: number) => void
    followingInProgress: Array<number>
    isOwner: number | null
}

export let Friend: React.FC<FriendPropsType> = ({friend, follow, unFollow, followingInProgress, isOwner}) => {
    return <div className={s.container}>
        <div className={s.friendContainer}>
            <div>
                <NavLink to={"/profile/" + friend.id}>
                    <img className={s.avatar}
                         src={friend.photos.small != null
                             ? friend.photos.small
                             : anonymousFriendPhoto}
                         alt="Friend avatar"/>
                </NavLink>
            </div>
            {isOwner &&
            <div>
                {friend.followed
                    ? <Button disabled={followingInProgress.some((id: number) => id === friend.id)}
                              className={s.button}
                              onClick={() => {unFollow(friend.id)}}>Unfollow</Button>
                    : <Button disabled={followingInProgress.some((id: number) => id === friend.id)}
                              className={s.button}
                              onClick={() => {follow(friend.id)}}>Follow</Button>
                }
            </div>
            }
            <div>
                <div>
                    <div className={s.name}>{friend.name}</div>
                    <div className={s.status}>{friend.status}</div>
                </div>
            </div>
        </div>
    </div>
}