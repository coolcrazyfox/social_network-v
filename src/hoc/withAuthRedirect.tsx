import { Redirect } from "react-router-dom";
import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { RootStateType } from "../redux/reduxStore";

type mapStateToPropsForRedirectType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: RootStateType): mapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth,
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    function RedirectComponent(props: mapStateToPropsForRedirectType) {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={"/login"}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}