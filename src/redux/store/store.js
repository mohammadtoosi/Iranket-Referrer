import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../slice/auth";
import ModalReducer from "../slice/modal";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        modal: ModalReducer,
    },
});
