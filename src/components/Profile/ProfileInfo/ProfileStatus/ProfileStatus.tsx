import React, { ChangeEvent } from "react";
import s from "./ProfileStatus.module.scss"

type MapDispatchToPropsType = {
    updateStatus: (status: string) => void
}

type MapStateToPropsType = {
    status: string
    isOwner: boolean
}

export type ProfileStatusPropsType = MapStateToPropsType & MapDispatchToPropsType;

type StateType = { editMode: boolean, status: string, isOwner: boolean };

class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status,
        isOwner: this.props.isOwner,
    }

    activateEditMode = () => {
        if (this.state.isOwner) {
            this.setState({
                editMode: true,
            })
        }
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            })
        }
    }

    render() {
        return <div>
            {!this.state.editMode ?
                <div>
                    <span className={s.status}
                          onClick={this.activateEditMode}>{this.props.status || "Status is not set"}
                    </span>
                </div>
                :
                <div>
                    <input autoFocus
                           onChange={this.onStatusChange}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}
                           className={s.editStatus}
                    >
                    </input>
                </div>
            }
        </div>
    }
}

export default ProfileStatus;