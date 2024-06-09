import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
	intervalId: null,
};

const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		startTimer: (state, action) => {
			if (!state.intervalId) {
				const intervalId = setInterval(() => {
					action.payload.dispatch(updateTimer());
				}, 1000);
				state.intervalId = intervalId;
			}
		},
		stopTimer: (state) => {
			if (state.intervalId) {
				clearInterval(state.intervalId);
				state.intervalId = null;
			}
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
export default timerSlice.reducer;
