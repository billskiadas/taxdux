
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/index.js';
import {initializeAuth} from "./actions/authActions.js";
import {tokenMiddleware} from "./middleware/tokenMiddleware.js"; // Adjust the path as needed

const createAppStore = async () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(tokenMiddleware)
                .concat(thunk),
    });

    await store.dispatch(initializeAuth());
    return store;
};

export default createAppStore;