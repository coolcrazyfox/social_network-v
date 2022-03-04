import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";
import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = "social_network/app/INITIALIZED-SUCCESS";

type AppStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false,
}

type SetUserDataActionType = ReturnType<typeof initializedSuccess>

export type InitializeActionsType = SetUserDataActionType

export const appReducer = (state: AppStateType = initialState, action: InitializeActionsType): AppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
};

export const initializedSuccess = () =>
    ({type: INITIALIZED_SUCCESS} as const);

export const initializeApp = () => {
    return (dispatch: ThunkDispatch<RootStateType, unknown, InitializeActionsType>) => {
        try {
            let promise = dispatch(getAuthUserData());
            promise
                .then(() => {
                    dispatch(initializedSuccess());
                })
        } catch (error) {
            console.log(`Error initialization app. ${error}`);
        }
    }
}

export default appReducer;