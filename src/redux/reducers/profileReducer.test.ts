import profileReducer, { addPost, deletePost, setStatus } from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: "It's my first post.", likesCount: 20},
        {id: 2, message: "Hello, welcome!", likesCount: 15},
    ],
    profile: null,
    isOwner: false,
    status: "",
}

describe("Profile reducer", () => {
    test("length of posts should be incremented", () => {
        let action = addPost("it-kamasutra");
        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(3);
    });

    test("message on new post should be correct", () => {
        let action = addPost("it-kamasutra");
        let newState = profileReducer(state, action);
        expect(newState.posts[2].message).toBe("Hello, welcome!");
    });

    test("after deleting length of messages should be decrement", () => {
        let action = deletePost(1);
        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(1);
    });

    test("after deleting length of messages shouldn't be decrement if id is incorrect", () => {
        let action = deletePost(1000);
        let newState = profileReducer(state, action);
        expect(newState.posts.length).toBe(2);
    });

    test("status should be correct", () => {
        let action = setStatus("test status");
        let newState = profileReducer(state, action);
        expect(newState.status).toBe("test status");
    })
})