
import * as userTypes from "../constants/userConstants.js";

const initialState = {
    profiles: null,
    loading: false,
    error: null
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case userTypes.SET_PROFILE:
            return {
                ...state,
                profiles: payload ? payload : null,
            };
        case userTypes.SET_LOADING:
            return {
                ...state,
                loading: payload
            }
        case userTypes.UPDATE_ROLE_SUCCESS:
            return {
                ...state,
                profiles: state.profiles.map(profile =>
                    profile.id === action.payload.userId ? { ...profile, role_name: action.payload.newRole } : profile
                ),
                error: null
            };
        case userTypes.UPDATE_ROLE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case userTypes.UPDATE_ACTIVE_STATUS_SUCCESS:
            return {
                ...state,
                profiles: state.profiles.map(profile =>
                    profile.id === payload.userId ? {...profile, active: payload.isActive} : profile
                )
            };
        case userTypes.UPDATE_ACTIVE_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
