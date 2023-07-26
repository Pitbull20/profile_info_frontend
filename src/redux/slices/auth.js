import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAuth = createAsyncThunk(
    "auth/FetchUserData",
    async (params) => {
        const { data } = await axios.post("auth/login", params);
        return data;
    }
);

export const fetchAuthMe = createAsyncThunk(
    "auth/FetchAuthMer",
    async (params) => {
        const { data } = await axios.post("profile/get-profile-info", params);
        return data;
    }
);

export const fetchRegister = createAsyncThunk(
    "auth/FetchRegister",
    async (params) => {
        const { data } = await axios.post("auth/register", params);
        return data;
    }
);

export const fetchMyData = "";

const initialState = {
    data: null,
    status: "loading",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
        [fetchRegister.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
    },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.reducer;
