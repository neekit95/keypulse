import { configureStore } from '@reduxjs/toolkit';
import textsReducer from "./slices/textsSlice";
import timerReducer from "./slices/timerSlice";

export const store = configureStore({
	reducer: {
		texts: textsReducer,
		timer: timerReducer,
	},
});

export default store;