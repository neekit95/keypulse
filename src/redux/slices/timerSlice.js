import { createSlice } from "@reduxjs/toolkit";

let intervalId = null;

const initialState = {
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

export const { startTimer, stopTimer, resetTimer, updateTimer } = timerSlice.actions;

export const startTimerThunk = () => (dispatch, getState) => {
	const { isTimerStarted } = getState().timer;
	if (!isTimerStarted) {
		dispatch(startTimer());
		intervalId = setInterval(() => {
			dispatch(updateTimer());
		}, 1000);
	}
};

export const stopTimerThunk = () => (dispatch, getState) => {
	const { isTimerStarted } = getState().timer;
	if (isTimerStarted) {
		clearInterval(intervalId);
		intervalId = null;
		dispatch(stopTimer());
	}
};

export default timerSlice.reducer;
