import React from "react";
import "./App.scss";
import "./Reset.scss";
import { HashRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { NavContainer } from "./components/Nav/NavContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import store, { RootStateType } from "./redux/reduxStore";
import { initializeApp } from "./redux/reducers/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";

const Music = React.lazy(() => import ("./components/Music/Music"));
const SettingsContainer = React.lazy(() => import ("./components/Settings/SettingsContainer"));
const FriendsContainer = React.lazy(() => import ("./components/Friends/FriendsContainer"));
const Page404 = React.lazy(() => import ("./components/Page404/Page404"));
const LoginPage = React.lazy(() => import ("./components/Login/Login"));
const UsersContainer = React.lazy(() => import ("./components/Users/UsersContainer"));
const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));

type MapDispatchToPropsType = {
    initializeApp: () => void
}

type MapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized,
})

export type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div>
                <HeaderContainer/>
                <div className="main-wrapper">
                    <NavContainer/>
                    <div className="main-content">
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                            <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                            <Route path="/users" render={withSuspense(UsersContainer)}/>
                            <Route path="/login" render={withSuspense(LoginPage)}/>
                            <Route path="/music" render={withSuspense(Music)}/>
                            <Route path="/settings" render={withSuspense(SettingsContainer)}/>
                            <Route path="/friends" render={withSuspense(FriendsContainer)}/>
                            <Route path="/*" render={withSuspense(Page404)}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {initializeApp}))(App);

const SocialNetworkApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SocialNetworkApp;