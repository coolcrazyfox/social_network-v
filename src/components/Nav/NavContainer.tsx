import { connect } from "react-redux";
import { Nav } from "./Nav";
import { Dispatch } from "redux";
import { RootStateType } from "../../redux/reduxStore";
import { FriendsType } from "../../redux/reducers/sidebarFriendsReducer";

type DispatchToPropsType = {}

type MapStateToPropsType = {
  friends: FriendsType[]
}

export type NavPropsType = MapStateToPropsType & DispatchToPropsType

let mapStateToProps = (state: RootStateType) => {
  return {
    friends: state.sidebarFriends.friends
  };
};
let mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsType => {
  return {};
};

export const NavContainer = connect<MapStateToPropsType, DispatchToPropsType, {}, RootStateType>
(mapStateToProps, mapDispatchToProps)(Nav);