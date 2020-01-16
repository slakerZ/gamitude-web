import * as types from "./types";

const initState = {
    authError: null,
    status: types.AUTH_UNKNOWN,
    user: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.AUTH_LOGIN_FAILED:
            return {
                ...state,
                authError: action.error.message,
                status: types.AUTH_UNKNOWN,
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                authError: null,
                status: types.AUTH_LOGGED_IN,
                user: action.user,
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                authError: null,
                status: types.AUTH_UNKNOWN,
                user: null,
            };
        case types.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                authError: null,
                status: types.AUTH_LOGGED_IN,
                userProfile: action.userProfile,
            };
        case types.AUTH_REGISTER_FAILED:
            return {
                ...state,
                authError: action.error.message,
                status: types.AUTH_UNKNOWN,
            };
        case types.USER_FETCH_REQUEST:
            return {
                ...state,
                authError: null,
                userProfile: null,
            };
        case types.USER_FETCH_SUCCESS:
            return {
                ...state,
                authError: null,
                userProfile: action.userProfile,
            };
        case types.USER_FETCH_FAILED:
            return {
                ...state,
                userProfile: null,
                status: types.AUTH_UNKNOWN,
            };
        default:
            return state;
    }
};

export default authReducer;
