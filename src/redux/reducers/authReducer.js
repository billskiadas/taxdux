
import * as authTypes from "../constants/authConstants.js";

const initialState = {
    userData: null,
    role: null,
    group: null,
    loading: false,
    userRole: null,
    refreshToken: null,
    accessToken: null,
    signInError: null,
    tokenExpiresAt: null
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case authTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                userData: payload ? payload.user : null,
                accessToken: payload ? payload.accessToken : null,
                refreshToken: payload ? payload.refreshToken : null,
                tokenExpiresAt: payload ? payload.expires_at : null,
                signInError: null,
            };

        case authTypes.SIGNIN_FAIL:
            return {
                ...state,
                userData: null,
                userRole: null,
                refreshToken: null,
                accessToken: null,
                tokenExpiresAt: null,
                successMessage: null,
                signInError: payload ? payload : null,
            };

        case authTypes.LOGOUT:
            return {
                ...state,
                userData: null,
                refreshToken: null,
                accessToken: null,
                tokenExpiresAt: null,
                successMessage: null,
                signInError: null
            };

        case authTypes.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                userData: payload ? payload.user : null,
                accessToken: payload ? payload.accessToken : null,
                refreshToken: payload ? payload.refreshToken : null,
                tokenExpiresAt: payload ? payload.expires_at : null,
                signInError: null
            };
        case authTypes.SET_USER_ROLE:
            return {
                ...state,
                userRole: payload,
            };

        case authTypes.CLEAR_USER_ROLE:
            return {
                ...state,
                userRole: null,
            };
        case authTypes.SET_LOADING:
            return {
                ...state,
                loading: payload,
            };

        case authTypes.CLEAR_LOADING:
            return {
                ...state,
                loading: false,
            };
        case authTypes.CLEAR_GROUP:
            return {
                ...state,
                group: [],
            };
        case authTypes.SET_GROUP:
            return {
                ...state,
                group: payload ? payload : null,
            };
        case authTypes.CLEAR_ROLE:
            return {
                ...state,
                group: [],
            };
        case authTypes.SET_ROLE:
            return {
                ...state,
                role: payload ? payload : null,
            };
        default:
            return state;
    }
};

export default authReducer;
