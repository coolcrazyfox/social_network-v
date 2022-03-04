import userReducer, {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unFollowSuccess,
} from "./usersReducer";

let state = {
    users: [{
        followed: false,
        id: 7,
        name: "Test user",
        photos: {
            small: null,
            large: null,
        },
        status: null,
        uniqueUrlName: null,
    }],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    isOwner: null,
}

describe("App reducer", () => {
    test("subscription should be successful", () => {
        let action = followSuccess(7);
        let newState = userReducer(state, action);
        expect(newState.users[0].followed).toBe(true);
    })

    test("unsubscription should be successful", () => {
        let action = unFollowSuccess(7);
        let newState = userReducer(state, action);
        expect(newState.users[0].followed).toBe(false);
    })

    test("setting of current page value should be successful", () => {
        let action = setCurrentPage(5);
        let newState = userReducer(state, action);
        expect(newState.currentPage).toBe(5);
    })

    test("setting of total users count value should be correct", () => {
        let action = setTotalUsersCount(20);
        let newState = userReducer(state, action);
        expect(newState.totalUsersCount).toBe(20);
    })

    test("fetching should be toggled", () => {
        let action = toggleIsFetching(true);
        let newState = userReducer(state, action);
        expect(newState.isFetching).toBe(true);
    })

    test("users array length should be changed", () => {
        let action = setUsers([
            {
                followed: false,
                id: 8,
                name: "Test user 2",
                photos: {
                    small: null,
                    large: null,
                },
                status: null,
                uniqueUrlName: null,
            },
            {
                followed: false,
                id: 9,
                name: "Test user 3",
                photos: {
                    small: null,
                    large: null,
                },
                status: null,
                uniqueUrlName: null,
            },
        ]);
        let newState = userReducer(state, action);
        expect(newState.users.length).toBe(2);
    })
})
