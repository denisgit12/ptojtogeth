import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit";

import {authReducer} from "./slices/auth.slice";
import {ordersReducer} from "./slices/orders.slice";
import {groupReducer} from "./slices/group.slice";
import {managerReducer} from "./slices/manager.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    orders : ordersReducer,
    groups : groupReducer,
    managers: managerReducer,
})

const setUpStore = () => configureStore({
    reducer: rootReducer
})

export {
    setUpStore
}