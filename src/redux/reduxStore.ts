import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import profileReducer, {
    ProfileActionsType,
} from "./reducers/profileReducer";
import dialogsReducer, {
    DialogsActionsType,
} from "./reducers/dialogsReducer";
import sidebarFriendsReducer from "./reducers/sidebarFriendsReducer";
import usersReducer, { UserActionsType } from "./reducers/usersReducer";
import friendsReducer, { FriendActionsType } from "./reducers/friendsReducer";
import authReducer, { AuthActionsType } from "./reducers/authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form"
import appReducer, { InitializeActionsType } from "./reducers/appReducer";

let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarFriends: sidebarFriendsReducer,
    usersPage: usersReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type RootReducerType = typeof RootReducer;
export type RootStateType = ReturnType<RootReducerType>

export type RootActionsType = ProfileActionsType
    | DialogsActionsType
    | UserActionsType
    | FriendActionsType
    | AuthActionsType
    | InitializeActionsType

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;