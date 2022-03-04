import { UsersAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";

const FOLLOW = "social_network/user/FOLLOW";
const UNFOLLOW = "social_network/user/UNFOLLOW";
const SET_USERS = "social_network/user/SET-USERS";
const SET_CURRENT_PAGE = "social_network/user/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "social_network/user/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "social_network/user/TOGGLE-IS-FETCHING";
const FOLLOWING_IN_PROGRESS = "social_network/user/FOLLOWING-IN-PROGRESS";

export type UserType = {
    followed: boolean
    id: number
    name: string
    photos: {
        small: string | null | undefined,
        large: string | null | undefined,
    }
    status: string | null
    uniqueUrlName: string | null
}

type UsersStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    isOwner: number | null
}

let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    isOwner: null, // not use, need for TS
}

type FollowActionType = ReturnType<typeof followSuccess>
type UnFollowActionType = ReturnType<typeof unFollowSuccess>
type SetUsersActionType = ReturnType<typeof setUsers>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type FollowingInProgressActionType = ReturnType<typeof toggleFollowingProgress>

export type UserActionsType = FollowActionType
    | UnFollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | FollowingInProgressActionType

const userReducer = (state: UsersStateType = initialState, action: UserActionsType): UsersStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true};
                    } else return user;
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false};
                    } else return user;
                }),
            };
        case SET_USERS: {
            return {...state, users: [...action.users]};
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        }
        default:
            return state;
    }
};

export const followSuccess = (userId: number) =>
    ({type: FOLLOW, userId} as const)
export const unFollowSuccess = (userId: number) =>
    ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UserType>) =>
    ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) =>
    ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) =>
    ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) =>
    ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
    ({type: FOLLOWING_IN_PROGRESS, isFetching, userId} as const)

export const getUsers = (page: number, pageSize: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, UserActionsType>) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setCurrentPage(page));
            let response = await UsersAPI.getUsers(page, pageSize);
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(response.items));
            dispatch(setTotalUsersCount(response.totalCount));
        } catch (error) {
            console.log(`Error getting users. ${error}`);
        }
    }
}

export const follow = (userId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, UserActionsType>) => {
        try {
            dispatch(toggleFollowingProgress(true, userId));
            let response = await UsersAPI.follow(userId);
            if (response.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        } catch (error) {
            console.log(`Error following. ${error}`);
        }
    }
}

export const unFollow = (userId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, UserActionsType>) => {
        try {
            dispatch(toggleFollowingProgress(true, userId));
            let response = await UsersAPI.unFollow(userId);
            if (response.resultCode === 0) {
                dispatch(unFollowSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        } catch (error) {
            console.log(`Error unfollowing. ${error}`);
        }
    }
}

export default userReducer;