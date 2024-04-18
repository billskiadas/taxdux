import {supabase} from "../../supabase/createSupabaseClient.js";
import * as authTypes from "../constants/authConstants.js";
import {handleApiError} from "../api/utils.js";
import {loading} from "../actions/authActions.js";

const getSessionFromSupabase = async () => {
    const {data, error} =  await supabase.auth.getSession();
    if (error) {
        new Error(JSON.stringify(error))
        return handleApiError(error);
    }
    return data.session;
}

export const tokenMiddleware = (store) => (next) => (action) => {
    if (action.meta && action.meta.requiresAuth) {

        store.dispatch(loading(true))
        const session = getSessionFromSupabase()
        store.dispatch(loading(false))

        if (session) {
            console.log('inside token middleware ')
        } else {
            store.dispatch({ type: authTypes.LOGOUT });
        }
    }

    return next(action);
};