import { configureStore } from '@reduxjs/toolkit';
import textsReducer from "./slices/textsSlice";
import timerReducer from "./slices/timerSlice";
import speedReducer from "./slices/speedSlice";

export const store = configureStore({
	reducer: {
		texts: textsReducer,
		timer: timerReducer,
		speed: speedReducer,
	},
});

export default store;
