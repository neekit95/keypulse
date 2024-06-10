import { configureStore } from '@reduxjs/toolkit';
import {thunk} from "redux-thunk";
import textsReducer from "./slices/textsSlice";
import timerReducer from "./slices/timerSlice";

export const store = configureStore({
	reducer: {
		texts: textsReducer,
		timer: timerReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;