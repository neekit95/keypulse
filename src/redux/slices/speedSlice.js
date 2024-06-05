import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	value: 0,
};

const speedSlice = createSlice({
	name: 'speed',
	initialState,
	reducers: {
		setTrue: (state) => {
			state.value = true;
		}
	}
})