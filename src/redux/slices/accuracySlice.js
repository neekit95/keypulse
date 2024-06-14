import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
};

const accuracySlice = createSlice({
	name: 'accuracy',
	initialState,
	reducers: {
		updateAccuracy: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { updateAccuracy } = accuracySlice.actions;
export default accuracySlice.reducer;
