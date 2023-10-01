import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {managerService} from "../../services";


let initialState = {
    managers: [],
    managerStatistic:[],
    errors: null,
    loading: null
};

const getManagers = createAsyncThunk(
    "managerSlice/getManagers",
    async ({page}, thunkAPI)=>{
        try {
            const {data} = await managerService.getAll(page);
            return data;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);

        }
    }

)
const getManagersStatistic = createAsyncThunk(
    "managerSlice/getManagersStatistic",
    async (id, thunkAPI)=>{
        try {
            const {data} = await managerService.getStatistic(id);
            return data;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);

        }
    }

)
const createManager = createAsyncThunk(
    "managerSlice/createManager",
    async ({manager, page},thunkAPI ) => {
        try {
            console.log(manager);
            const {data} = await managerService.create(manager);
            thunkAPI.dispatch(getManagers(page));

            return data;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)
const updateManager = createAsyncThunk(
    "managerSlice/updateManager",
    async ({id, manager, page},thunkAPI ) => {
        try {
            const {data} = await managerService.update(id, manager);
            thunkAPI.dispatch(getManagers(page));

            return data;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

const managerSlice = createSlice({
        name: "managerSlice",
        initialState,
        reducers: {},
        extraReducers: {
            [getManagers.fulfilled]: (state, action)=> {
                state.managers = action.payload
            },
            [getManagersStatistic.fulfilled]: (state, action)=> {
                state.managerStatistic = action.payload
            }
        }
    },
)

const {reducer: managerReducer} = managerSlice;

const managerAction = {
    getManagers,
    createManager,
    updateManager,
    getManagersStatistic
}
export {
    managerReducer,
    managerAction
}