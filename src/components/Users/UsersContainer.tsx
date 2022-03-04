import React from "react";
import { connect } from "react-redux";
import { setCurrentPage, UserType, getUsers, follow, unFollow } from "../../redux/reducers/usersReducer";
import { RootStateType } from "../../redux/reduxStore";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import stylePreloader from "../common/Preloader/Preloader.module.scss";
import { compose } from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector, getPageSizeSelector,
    getTotalUsersCountSelector, getUsersSelector,
} from "../../redux/selectors/userSelector";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    isOwner: number | null
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        isOwner: state.auth.userId,
    };
};

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    getUsers: (page: number, pageSize: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {setCurrentPage, pageSize} = this.props;
        setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <div className={stylePreloader.absolutePreloaderContainer}>
                <Preloader/>
            </div> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
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
    (mapStateToProps, {setCurrentPage, getUsers, follow, unFollow}),
)(UsersContainer)