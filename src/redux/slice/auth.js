import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    check: true,
    register: false,
    otp: false,
    code: "",
    counter: 0,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        toggleCheckForm: (state) => {
            state.check = !state.check;
        },
        toggleOtpForm: (state) => {
            state.otp = !state.otp;
        },
        toggleRegisterForm: (state) => {
            state.register = !state.register;
        },
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setMobile: (state, action) => {
            state.mobile = action.payload;
        },
        setCounterHandler: (state, action) => {
            state.counter = action.payload;
        },
    },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
