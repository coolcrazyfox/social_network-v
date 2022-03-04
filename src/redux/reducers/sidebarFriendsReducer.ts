import cat1 from '../../assets/images/cat1.jpg'
import cat2 from '../../assets/images/cat22.jpg'
import cat4 from '../../assets/images/cat44.jpg'

export type FriendsType = {
    id: number
    link: string
}

type SidebarFriendsStateType = {
    friends: FriendsType[]
}

let initialState = {
    friends: [
        {id: 1, link: cat1},
        {id: 2, link: cat2},
        {id: 3, link: cat4},
    ],
}

const sidebarFriendsReducer = (state: SidebarFriendsStateType = initialState): SidebarFriendsStateType => {
    return state;
}

export default sidebarFriendsReducer;