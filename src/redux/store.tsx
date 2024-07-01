import {configureStore, combineReducers} from '@reduxjs/toolkit';
import textsReducer from "./slices/textsSlice";
import timerReducer from "./slices/timerSlice";
import speedReducer from "./slices/speedSlice";
import accuracyReducer from "./slices/accuracySlice";

const rootReducer = combineReducers({
    texts: textsReducer,
    timer: timerReducer,
    speed: speedReducer,
    accuracy: accuracyReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});


export default store;
