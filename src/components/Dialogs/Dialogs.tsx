import React from "react";
import s from "./Dialogs.module.scss";
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AvatarItem from "./AvatarsItem/AvatarsItem";
import { DialogsPropsType } from "./DialogsContainer";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validator";
import Button from "../common/Button/Button";

type FormDataType = {
    newMessageBody: string
}

const maxLength100 = maxLengthCreator(100);

const NewMessageForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Enter your message", "newMessageBody", [required, maxLength100], Textarea, {}, "", "", s.input)}
            <div>
                <Button type={"submit"}
                        className={s.sendButton}>
                    Send
                </Button>
            </div>
        </form>
    )
}

const NewMessageReduxForm = reduxForm<FormDataType>({form: "dialogAddMessageForm"})(NewMessageForm)

export const Dialogs = (props: DialogsPropsType) => {
    let avatarsElements = props.avatars
        .map(el => <AvatarItem key={el.id} link={el.link} id={el.id}/>);

    let dialogsElements = props.dialogs
        .map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>);

    let messagesElements = props.messages
        .map(el => <Message key={el.id} message={el.message} id={el.id}/>);

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageBody)
    }

    return (
        <div className={s.container}>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {avatarsElements}
                </div>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div className={s.inputContainer}>
                    <NewMessageReduxForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    );
};