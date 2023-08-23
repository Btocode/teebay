import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    modals: modalReducer,
    user: userReducer,
  },
});
