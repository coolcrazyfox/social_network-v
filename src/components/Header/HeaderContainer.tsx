import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthUserData, logout, setProfileSmallPhoto } from "../../redux/reducers/authReducer";
import { RootStateType } from "../../redux/reduxStore";

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
    profileSmallPhoto: string | null,
    userId: number | null
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    profileSmallPhoto: state.auth.profileSmallPhoto,
    userId: state.auth.userId,
})

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
    setProfileSmallPhoto: (userId: number) => void
}

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthUserData();
        if (this.props.userId) {
            this.props.setProfileSmallPhoto(this.props.userId);
        }
    }

    render() {
        return <Header {...this.props}/>
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
(mapStateToProps, {getAuthUserData, logout, setProfileSmallPhoto})(HeaderContainer);