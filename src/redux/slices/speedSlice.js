import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
};

const speedSlice = createSlice({
	name: 'speed',
	initialState,
	reducers: {
		updateSpeed: (state, action) => {
			state.value = action.payload;
		},
		calculateSpeed: (state, action) => {
			const { correctSymbols, timer } = action.payload;
			if (timer > 0) {
				state.value = Math.round(correctSymbols / (timer / 10) * 60);
			} else {
				state.value = 0;
			}
		},
	},
});

export const { updateSpeed, calculateSpeed } = speedSlice.actions;
export default speedSlice.reducer;
