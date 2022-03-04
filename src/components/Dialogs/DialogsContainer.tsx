import { sendMessage } from "../../redux/reducers/dialogsReducer";
import { connect } from "react-redux";
import { Dialogs } from "./Dialogs";
import { compose, Dispatch } from "redux";
import { RootStateType } from "../../redux/reduxStore";
import React from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

export type AvatarType = {
    id: number
    link: string
}

export type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    avatars: Array<AvatarType>
}

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        avatars: state.dialogsPage.avatars,
    };
};

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessage(newMessageBody));
        },
    };
};

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs);