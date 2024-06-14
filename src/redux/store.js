import { configureStore } from '@reduxjs/toolkit';
import textsReducer from "./slices/textsSlice";
import timerReducer from "./slices/timerSlice";
import speedReducer from "./slices/speedSlice";
import accuracyReducer from "./slices/accuracySlice";

export const store = configureStore({
	reducer: {
		texts: textsReducer,
		timer: timerReducer,
		speed: speedReducer,
		accuracy: accuracyReducer,
	},
});

export default store;
