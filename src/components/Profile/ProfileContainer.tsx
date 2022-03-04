import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
    getUserProfile,
    getStatus,
    updateStatus,
    ProfileType,
    savePhoto,
    saveProfile,
} from "../../redux/reducers/profileReducer";
import { RootStateType } from "../../redux/reduxStore";
import { compose } from "redux";

type MapStateToPropsType = {
    profile: null | ProfileType
    isOwner: boolean
    currentUser: any
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: (profile: ProfileType) => any
}

type MatchParamsType = {
    userId: string
}

export type ProfilePropsType = RouteComponentProps<MatchParamsType> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {
    refreshProfile() {
        let userId: number | null = Number(this.props.match.params.userId);
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        if (typeof userId === "number") {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     isOwner={
                         // if profile id is missing in the address bar
                         this.props.match.params.userId === undefined
                             ? true
                             // else compare current user id with authenticated user id
                             : +(this.props.match.params.userId) === this.props.currentUser
                     }
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isOwner: state.profilePage.isOwner,
    currentUser: state.auth.userId,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer);