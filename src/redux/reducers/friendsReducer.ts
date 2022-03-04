import { UsersAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";

const FOLLOW = "social_network/friend/FOLLOW";
const UNFOLLOW = "social_network/friend/UNFOLLOW";
const SET_FRIENDS = "social_network/friend/SET-FRIENDS";
const SET_CURRENT_PAGE = "social_network/friend/SET-CURRENT-PAGE";
const SET_TOTAL_FRIENDS_COUNT = "social_network/friend/SET-TOTAL-FRIENDS-COUNT";
const TOGGLE_IS_FETCHING = "social_network/friend/TOGGLE-IS-FETCHING";
const FOLLOWING_IN_PROGRESS = "social_network/friend/FOLLOWING-IN-PROGRESS";

export type FriendType = {
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

type FriendsStateType = {
    friends: Array<FriendType>
    pageSize: number
    totalFriendsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    isOwner: number | null
}

let initialState = {
    friends: [],
    pageSize: 20,
    totalFriendsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    isOwner: null, // not use, need for TS
}

type FollowActionType = ReturnType<typeof followSuccess>
type UnFollowActionType = ReturnType<typeof unFollowSuccess>
type SetFriendsActionType = ReturnType<typeof setFriends>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type SetTotalFriendsCountActionType = ReturnType<typeof setTotalFriendsCount>
type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type FollowingInProgressActionType = ReturnType<typeof toggleFollowingProgress>

export type FriendActionsType = FollowActionType
    | UnFollowActionType
    | SetFriendsActionType
    | SetCurrentPageActionType
    | SetTotalFriendsCountActionType
    | ToggleIsFetchingActionType
    | FollowingInProgressActionType

const friendsReducer = (state: FriendsStateType = initialState, action: FriendActionsType): FriendsStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                friends: state.friends.map(friend => {
                    if (friend.id === action.friendId) {
                        return {...friend, followed: true};
                    } else return friend;
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                friends: state.friends.map(friend => {
                    if (friend.id === action.friendId) {
                        return {...friend, followed: false};
                    } else return friend;
                }),
            };
        case SET_FRIENDS: {
            return {...state, friends: [...action.friends]};
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_FRIENDS_COUNT: {
            return {...state, totalFriendsCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.friendId]
                    : state.followingInProgress.filter(id => id !== action.friendId),
            }
        }
        default:
            return state;
    }
};

export const followSuccess = (friendId: number) =>
    ({type: FOLLOW, friendId} as const)
export const unFollowSuccess = (friendId: number) =>
    ({type: UNFOLLOW, friendId} as const)
export const setFriends = (friends: Array<FriendType>) =>
    ({type: SET_FRIENDS, friends} as const)
export const setCurrentPage = (currentPage: number) =>
    ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalFriendsCount = (totalFriendsCount: number) =>
    ({type: SET_TOTAL_FRIENDS_COUNT, count: totalFriendsCount} as const)
export const toggleIsFetching = (isFetching: boolean) =>
    ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, friendId: number) =>
    ({type: FOLLOWING_IN_PROGRESS, isFetching, friendId} as const)

export const getFriends = (page: number, pageSize: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, FriendActionsType>) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setCurrentPage(page));
            let response = await UsersAPI.getFriends(page, pageSize);
            dispatch(toggleIsFetching(false));
            dispatch(setFriends(response.items));
            dispatch(setTotalFriendsCount(response.totalCount));
        } catch (error) {
            console.log(`Error getting friends. ${error}`);
        }
    }
}

export const follow = (friendId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, FriendActionsType>) => {
        try {
            dispatch(toggleFollowingProgress(true, friendId));
            let response = await UsersAPI.follow(friendId);
            if (response.resultCode === 0) {
                dispatch(followSuccess(friendId));
            }
            dispatch(toggleFollowingProgress(false, friendId));
        } catch (error) {
            console.log(`Error following. ${error}`);
        }
    }
}

export const unFollow = (friendId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, FriendActionsType>) => {
        try {
            dispatch(toggleFollowingProgress(true, friendId));
            let response = await UsersAPI.unFollow(friendId);
            if (response.resultCode === 0) {
                dispatch(unFollowSuccess(friendId));
            }
            dispatch(toggleFollowingProgress(false, friendId));
        } catch (error) {
            console.log(`Error unfollowing. ${error}`);
        }
    }
}

export default friendsReducer;