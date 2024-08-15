import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../store";

type IntervalId = ReturnType<typeof setInterval> | null;
let intervalId: IntervalId = null;

interface TimerState {
    value: number;
    isTimerStarted: boolean;
}

const initialState: TimerState = {
    value: 0,
    isTimerStarted: false,
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: (state) => {
            state.isTimerStarted = true;
        },
        stopTimer: (state) => {
            state.isTimerStarted = false;
        },
        resetTimer: (state) => {
            state.value = 0;
        },
        updateTimer: (state) => {
            state.value += 1;
        },
    },
});

export const {startTimer, stopTimer, resetTimer, updateTimer} = timerSlice.actions;

export const startTimerThunk = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {isTimerStarted} = getState().timer;
    if (!isTimerStarted) {
        dispatch(startTimer());
        intervalId = setInterval(() => {
            dispatch(updateTimer());
        }, 100);
    }
};

export const stopTimerThunk = () => (dispatch: any, getState: any) => {
    const {isTimerStarted} = getState().timer;
    if (isTimerStarted && intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        dispatch(stopTimer());
    }
};

export default timerSlice.reducer;
