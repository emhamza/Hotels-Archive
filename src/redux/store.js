import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../redux/booking/roomSlice"

const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export default store;
