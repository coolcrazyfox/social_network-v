import axios from "axios";
import { UserType } from "../redux/reducers/usersReducer";
import { ProfileType } from "../redux/reducers/profileReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "34c4f502-d7f5-47ba-9bb6-a6e835a2121e"},
});

type GetUsersResponseType = {
    error: null | any
    items: Array<UserType>
    totalCount: number
}

type GetProfileResponseType = ProfileType

type FollowResponseType = {
    data: {}
    fieldsErrors: Array<any>
    messages: Array<any>
    resultCode: number
}

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 1) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    getFriends(currentPage = 1, pageSize = 1) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&friend=true`)
            .then(response => response.data);
    },

    getProfile(userId: number) {
        return ProfileAPI.getProfile(userId);
    },

    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`, {})
            .then(response => response.data);
    },

    unFollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
            .then(response => response.data);
    },
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileResponseType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getProfileSmallPhoto(userId: number) {
        return instance.get<GetProfileResponseType>(`profile/${userId}`)
            .then(response => response.data.photos.small);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
            .then(response => response.data);
    },
    savePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
            .then(response => response.data);
    },
}

export const AuthAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data);
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data);
    },
}