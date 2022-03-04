import dialogsReducer, { sendMessage } from "./dialogsReducer";

let state = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Valera"},
        {id: 3, name: "Katya"},
        {id: 4, name: "Andrei"},
        {id: 5, name: "Viktor"},
    ],
    messages: [
        {id: 1, message: "Ha"},
        {id: 2, message: "Yo!"},
        {id: 3, message: "How are you ?"},
        {id: 4, message: "This social network is awesome!"},
        {id: 5, message: "Go"},
    ],
    avatars: [
        {id: 1, link: "https://i.pinimg.com/736x/3f/47/b3/3f47b39a801290271ad789d1ecc053cc.jpg"},
        {id: 2, link: "https://img.joinfo.com/i/2018/06/800x0/5b30ce1e882dc.jpg"},
        {id: 3, link: "https://mobimg.b-cdn.net/v3/fetch/62/620e78234f747fa272d1bbb5a9032467.jpeg"},
        {id: 4, link: "https://wallbox.ru/resize/800x480/wallpapers/main/201522/344385ce96c7f38.jpg"},
        {id: 5, link: "https://www.ejin.ru/wp-content/uploads/2019/05/smeshnoj-kotik-oblizyvaetsja.jpg"},
    ],
}

describe("Dialogs reducer", () => {
    test("message should be send", () => {
        let action = sendMessage("test message");
        let newState = dialogsReducer(state, action);
        expect(newState.messages.length).toBe(6);
    })

    test("message should be correct", () => {
        let action = sendMessage("test message");
        let newState = dialogsReducer(state, action);
        expect(newState.messages[5].message).toBe("test message");
    })
})