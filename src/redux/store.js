import { configureStore } from "@reduxjs/toolkit";
import countrySliceReducer from "./coutriesSlice/countrySlice";

const store = configureStore({
  reducer: {
    countries: countrySliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
