import { configureStore } from '@reduxjs/toolkit';
import textsReducer from "./slices/textsSlice";

export const store = configureStore({
	reducer: {
		texts: textsReducer,
	},
});

export default store;