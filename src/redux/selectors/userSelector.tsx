import { RootStateType } from "../reduxStore";
import { createSelector } from "reselect";
import { UserType } from "../reducers/usersReducer";

const getUsers = (state: RootStateType) => {
    return state.usersPage.users;
}
export const getUsersSelector = createSelector(getUsers, (users: Array<UserType>) => {
    return users.filter((u: UserType) => u);
})

export const getPageSizeSelector = (state: RootStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCountSelector = (state: RootStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageSelector = (state: RootStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetchingSelector = (state: RootStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressSelector = (state: RootStateType) => {
    return state.usersPage.followingInProgress
}