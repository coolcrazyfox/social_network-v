import React from "react";
import { connect } from "react-redux";
import { follow, FriendType, getFriends, setCurrentPage, unFollow } from "../../redux/reducers/friendsReducer";
import { RootStateType } from "../../redux/reduxStore";
import { Friends } from "./Friends";
import { Preloader } from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getFriendsSelector, getIsFetchingSelector,
    getPageSizeSelector, getTotalFriendsCountSelector,
} from "../../redux/selectors/friendSelector";
import stylePreloader from "../common/Preloader/Preloader.module.scss";

type MapStateToPropsType = {
    friends: Array<FriendType>
    pageSize: number
    totalFriendsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    isOwner: number | null
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        friends: getFriendsSelector(state),
        pageSize: getPageSizeSelector(state),
        totalFriendsCount: getTotalFriendsCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        isOwner: state.auth.userId,
    };
};

type MapDispatchToPropsType = {
    follow: (friendId: number) => void
    unFollow: (friendId: number) => void
    setCurrentPage: (pageNumber: number) => void
    getFriends: (page: number, pageSize: number) => void
}

export type FriendsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

class FriendsContainer extends React.Component<FriendsContainerPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getFriends(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {setCurrentPage, pageSize} = this.props;
        setCurrentPage(pageNumber);
        this.props.getFriends(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <div className={stylePreloader.absolutePreloaderContainer}>
                <Preloader/>
            </div> : null}
            <Friends totalFriendsCount={this.props.totalFriendsCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     onPageChanged={this.onPageChanged}
                     friends={this.props.friends}
                     follow={this.props.follow}
                     unFollow={this.props.unFollow}
                     followingInProgress={this.props.followingInProgress}
                     isOwner={this.props.isOwner}
            />
        </>
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {setCurrentPage, getFriends, follow, unFollow}),
)(FriendsContainer)