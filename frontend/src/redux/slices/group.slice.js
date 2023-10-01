import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {groupService} from "../../services";


let initialState = {
    groups: [],
    errors: null,
    loading: null
};

const getGroups = createAsyncThunk(
    "groupSlice/getGroups",
    async (_, thunkAPI)=>{
        try {
            const {data} = await groupService.getAllGroups();
            return data;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);

        }
    }

)
const addGroups = createAsyncThunk(
    "groupSlice/addGroups",
    async (group, thunkAPI)=>{
        try {
            const {data} = await groupService.addGroups(group);
            thunkAPI.dispatch(getGroups());
            return data;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);

        }
    }

)
const groupSlice = createSlice({
        name: "groupSlice",
        initialState,
        reducers: {},
        extraReducers: {
            [getGroups.fulfilled]: (state, action)=> {
                state.groups = action.payload
            }
        }
    },
)

const {reducer: groupReducer} = groupSlice;

const groupAction = {
    getGroups,
    addGroups
}
export {
    groupReducer,
    groupAction
}