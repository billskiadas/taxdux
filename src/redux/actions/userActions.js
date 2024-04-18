import * as userTypes from "../constants/userConstants.js";
import supabaseAPI from "../api/supabaseAPI.js";
import {message} from "antd";
import {getRoleDisplay} from "../../components/utils/utils.js";

export const loading = (isLoading) => ({
    type: userTypes.SET_LOADING,
    payload: isLoading,
});

export const profile = (usersProfile) => ({
    type: userTypes.SET_PROFILE,
    payload: usersProfile,
});

export const fetchProfileFailed = (error) => ({
    type: userTypes.FETCH_PROFILE_FAILED,
    payload: error,
});

export const updateRoleSuccess = (userId, newRole) => ({
    type: userTypes.UPDATE_ROLE_SUCCESS,
    payload: { userId, newRole },
});

export const updateRoleFail = (error) => ({
    type: userTypes.UPDATE_ROLE_FAIL,
    payload: error,
});

export const updateActiveStatusSuccess = (userId, isActive) => ({
    type: userTypes.UPDATE_ACTIVE_STATUS_SUCCESS,
    payload: { userId, isActive },
});

export const updateActiveStatusFail = (error) => ({
    type: userTypes.UPDATE_ACTIVE_STATUS_FAIL,
    payload: error,
});



export const fetchProfiles = (id) => async (dispatch) => {
    dispatch(loading(true));
    try {
        const data = await supabaseAPI.fetchUsers();
        dispatch(profile(data.filter(d=>d.id !== id)));
    } catch (error) {
        dispatch(fetchProfileFailed(error.message));
    } finally {
        dispatch(loading(false));
    }
};



export const updateUserActiveStatus = (userId, isActive) => async (dispatch) => {
    dispatch(loading(true));
    try {
        await supabaseAPI.updateUserActiveStatus(userId, isActive);
        dispatch(updateActiveStatusSuccess(userId, isActive));
        message.success(`Status set to ${isActive ? 'active' : 'inactive'}`);
    } catch (error) {
        dispatch(updateActiveStatusFail(error.message));
    } finally {
        dispatch(loading(false));
    }
};


export const updateRole = (userId, newRole) => async (dispatch) => {
    dispatch(loading(true));
    try {
        await supabaseAPI.updateRole(userId, newRole);
        dispatch(updateRoleSuccess(userId, newRole));
        message.success(`Changed promoted role to ${getRoleDisplay(newRole)}`);
    } catch (error) {
        dispatch(updateRoleFail(error.message));
    } finally {
        dispatch(loading(false));
    }
};