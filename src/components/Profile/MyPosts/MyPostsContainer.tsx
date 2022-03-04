import { addPost, PostsType } from "../../../redux/reducers/profileReducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/reduxStore";
import { Dispatch } from "redux";

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

type MapStateToPropsType = {
    posts: PostsType[],
}

export type MyPostsConnectPropsType = MapStateToPropsType & MapDispatchToPropsType;

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    };
};

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPost(newPostText));
        },
    };
};

export type MyPostsCommonPropsType = {
    isOwner: boolean,
    userAvatar: string | null | undefined,
}

export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, MyPostsCommonPropsType, RootStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);