import { handleApiError } from "../api/utils.js";
import { supabase } from "../../supabase/createSupabaseClient.js";
import * as authTypes from "../constants/authConstants.js";
import * as supabaseTypes from "../constants/supabaseConstants.js";
import {getFormattedDate, hasTokenExpired, isValidToken} from "../../utils/authUtils.js";

export const logout = () => ({
    type: authTypes.LOGOUT
});

export const login = (supabaseSession) => ({
    type: authTypes.SIGNIN_SUCCESS,
    payload: supabaseSession,
});

export const loading = (isLoading) => ({
    type: authTypes.SET_LOADING,
    payload: isLoading,
});

export const setRole = (role) => ({
    type: authTypes.SET_ROLE,
    payload: role,
});

export const clearRole = () => ({
    type: authTypes.CLEAR_ROLE,
});

export const setGroup = (role) => ({
    type: authTypes.SET_GROUP,
    payload: role,
});

export const clearGroup = () => ({
    type: authTypes.CLEAR_GROUP,
});

export const initializeAuth = () => async (dispatch) => {
    dispatch(loading(true))
    const {data, error} = await supabase.auth.getSession();
    dispatch(loading(false))

    if (error) {
        handleSignOut(dispatch);
        return handleApiError(error);
    }

    if (data && data.session && !hasTokenExpired(data.session.expires_at) && isValidToken(data.session.access_token)) {
        handleLogin(dispatch, data.session);
        await setUserGroupFromSupabase(dispatch, data.session?.user?.id || null);
        await setUserRoleFromSupabase(dispatch, data.session?.user?.id || null);
    } else {
        handleSignOut(dispatch);
    }

    supabase.auth.onAuthStateChange((event, session) =>
        handleAuthStateChange(event, session, dispatch));

}

export const logoutUser = () => (dispatch) => {
    handleSignOut(dispatch);
}

const handleSignOut = (dispatch) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    dispatch(logout());
};

const handleLogin = (dispatch, session) => {
    if (!session) return ;
    localStorage.setItem('access_token', session.access_token);
    localStorage.setItem('expires_at', session.expires_at);
    dispatch(login(session));
};


const handleAuthStateChange = (event, session, dispatch) => {
    console.log('____________________________________');
    console.log('| 🚀 Supabase onAuthStateChange 🚀 |');
    console.log('|___________________________________|');
    console.log('| 👂 EVENT : ', event);
    console.log('| 🏠 Session : ', session);
    if (session) {
        console.log('| 📅 Expires At : ', getFormattedDate(new Date(session.expires_at * 1000)));
        console.log('| 🔑 Token Expired? : ', hasTokenExpired(session.expires_at));
    }
    console.log('|___________________________________|');


    switch (event) {
        case supabaseTypes.INITIAL_SESSION:
            !hasTokenExpired(session.expires_at)? handleLogin(dispatch, session) : handleSignOut(dispatch);
            break;
        case supabaseTypes.SIGNED_IN:
            !hasTokenExpired(session.expires_at)? handleLogin(dispatch, session): handleSignOut(dispatch);
            break;
        case supabaseTypes.SIGNED_OUT:
            handleSignOut(dispatch);
            break;
        case supabaseTypes.TOKEN_REFRESHED:
            !hasTokenExpired(session.expires_at)? handleLogin(dispatch, session) : handleSignOut(dispatch);
            break;
        case supabaseTypes.USER_UPDATED:
            !hasTokenExpired(session.expires_at)? handleLogin(dispatch, session) : handleSignOut(dispatch);
            break;
        default:
            console.log('Unhandled auth event:', event);
    }
};


const setUserGroupFromSupabase = async (dispatch, userId) => {
    if (!userId) return;
    dispatch(loading(true))
    const { data, error } = await supabase
        .from('user_group')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching user info:', error);
    } else {
        const groupName = data.map(item => item.group_name);
        dispatch(setGroup(groupName))
    }
    dispatch(loading(false))
}

const setUserRoleFromSupabase = async (dispatch, userId) => {
    if (!userId) return;
    dispatch(loading(true))
    const { data, error } = await supabase
        .from('user_role')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching user info:', error);
    } else {
        const roleName = data.map(item => item.role_name);
        dispatch(setRole(roleName))


    }
    dispatch(loading(false))
}


const insertUserRolerFromUserIdAndRoleName = async (userId, roleName) => {
    setLoading(true);
    try {
        const { data, error } = await supabase
            .from('user_role')
            .insert([
                { user_id: userId, role_name: roleName }
            ]);

        if (error) throw error;
        console.log(data); // You can see the inserted data in the console
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        dispatch(loading(false))

    }
};

export const addUserRole = (userId, roleName) => {
    return async (dispatch) => {
        dispatch(loading(false));
        try {
            const { data, error } = await supabase.from('user_role')
                .insert([{ user_id: userId, role_name: roleName }]);
            if (error) throw error;
            // dispatch({ type: ADD_USER_ROLE, payload: { userId, roleName } });
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            dispatch(loading(true));
        }
    };
};