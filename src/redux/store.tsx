import {configureStore} from "@reduxjs/toolkit";
import textsSlice from "./slices/textsSlice";
import timerSlice from "./slices/timerSlice";
import speedSlice from "./slices/speedSlice";
import accuracySlice from "./slices/accuracySlice";

const store = configureStore({
    reducer: {
        texts: textsSlice,
        timer: timerSlice,
        speed: speedSlice,
        accuracy: accuracySlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
