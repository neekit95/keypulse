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
	},
});

export const { updateSpeed } = speedSlice.actions;
export default speedSlice.reducer;
