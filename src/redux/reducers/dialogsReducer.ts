import { AvatarType, DialogType, MessageType } from "../../components/Dialogs/DialogsContainer";
import cat1 from '../../assets/images/cat1.jpg'
import cat2 from '../../assets/images/cat22.jpg'
import cat3 from '../../assets/images/cat33.jpg'
import cat4 from '../../assets/images/cat44.jpg'
import cat5 from '../../assets/images/cat55.jpg'

const SEND_DIALOG_MESSAGE = "social_network/dialogs/SEND-DIALOG-MESSAGE";

type DialogsStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    avatars: Array<AvatarType>
}

let initialState = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Valera"},
        {id: 3, name: "Katya"},
        {id: 4, name: "Andrei"},
        {id: 5, name: "Viktor"},
    ],
    messages: [
        {id: 1, message: "Hello!"},
        {id: 2, message: "Yo!"},
        {id: 3, message: "How are you ?"},
        {id: 4, message: "This social network is awesome!"},
    ],
    avatars: [
        {id: 1, link: cat1},
        {id: 2, link: cat2},
        {id: 3, link: cat3},
        {id: 4, link: cat4},
        {id: 5, link: cat5},
    ],
}

type SendDialogMessageActionType = ReturnType<typeof sendMessage>

export type DialogsActionsType = SendDialogMessageActionType

const dialogsReducer = (state: DialogsStateType = initialState, action: DialogsActionsType): DialogsStateType => {
    switch (action.type) {
        case SEND_DIALOG_MESSAGE: {
            let newMessageTextBody = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length + 1, message: newMessageTextBody}],
            };
        }
        default:
            return state;
    }
};

export const sendMessage = (newMessageBody: string) =>
    ({type: SEND_DIALOG_MESSAGE, newMessageBody} as const)

export default dialogsReducer;