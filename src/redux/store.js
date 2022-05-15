import { configureStore } from "@reduxjs/toolkit";
import reducer from "./contact-reducer";
export const store = configureStore({
  reducer: {
    contacts: reducer,
  },
});
