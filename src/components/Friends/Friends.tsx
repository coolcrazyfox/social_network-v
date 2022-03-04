import React from "react";
import s from "./Friends.module.scss"
import { FriendType } from "../../redux/reducers/friendsReducer";
import { Pagination } from "../common/Pagination/Pagination";
import { Friend } from "./Friend/Friend";

export type FriendsPropsType = {
    totalFriendsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    friends: Array<FriendType>
    follow: (friendId: number) => void
    unFollow: (friendId: number) => void
    followingInProgress: Array<number>
    isOwner: number | null
}

export let Friends: React.FC<FriendsPropsType> = ({
    totalFriendsCount, pageSize, currentPage, onPageChanged,
    friends, follow, unFollow, followingInProgress, isOwner,
}) => {
    let pagesCount = Math.ceil(totalFriendsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionSizeCondition = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return 5;
        } else {
            return 15;
        }
    }

    return <div className={s.wrapper}>
        {friends.length === 0
            ? <div className={s.withoutAuthorizationTextContainer}>
                <span className={s.withoutAuthorizationText}>The users you are following will be displayed here</span>
            </div>
            : <div>
                <Pagination totalItemsCount={totalFriendsCount} currentPage={currentPage} onPageChanged={onPageChanged}
                            pageSize={pageSize} portionSize={portionSizeCondition()}
                />
                <div className={s.container}>
                    {
                        friends.map(u => <Friend key={u.id}
                                                 friend={u}
                                                 follow={follow}
                                                 unFollow={unFollow}
                                                 followingInProgress={followingInProgress}
                                                 isOwner={isOwner}
                            />,
                        )
                    }
                </div>
            </div>}
    </div>
}