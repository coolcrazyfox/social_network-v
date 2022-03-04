import { RootStateType } from "../reduxStore";
import { createSelector } from "reselect";
import { FriendType } from "../reducers/friendsReducer";

const getFriends = (state: RootStateType) => {
    return state.friendsPage.friends;
}
export const getFriendsSelector = createSelector(getFriends, (friends: Array<FriendType>) => {
    return friends.filter((f: FriendType) => f);
})

export const getPageSizeSelector = (state: RootStateType) => {
    return state.friendsPage.pageSize;
}

export const getTotalFriendsCountSelector = (state: RootStateType) => {
    return state.friendsPage.totalFriendsCount
}

export const getCurrentPageSelector = (state: RootStateType) => {
    return state.friendsPage.currentPage
}

export const getIsFetchingSelector = (state: RootStateType) => {
    return state.friendsPage.isFetching
}

export const getFollowingInProgressSelector = (state: RootStateType) => {
    return state.friendsPage.followingInProgress
}