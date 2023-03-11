import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, id: "", cityShow: false, city: "" };

const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        toggleModalHandler: (state) => {
            state.isOpen = !state.isOpen;
        },
        setIDHandler: (state, action) => {
            state.id = action.payload;
        },
        toggleCityHandler: (state) => {
            state.cityShow = !state.cityShow;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
    },
});

export const ModalActions = modalSlice.actions;
export default modalSlice.reducer;
