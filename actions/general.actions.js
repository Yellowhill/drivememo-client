import {
    TOGGLE_LOADING,
    UPDATE_USERINFO
} from './actionTypes.js';


export function setLoading(bool) {
    return {
        type: TOGGLE_LOADING,
        payload: bool
    }
}

export function updateUserInfo(user) {
    return {
        type: UPDATE_USERINFO,
        payload: user
    }
}