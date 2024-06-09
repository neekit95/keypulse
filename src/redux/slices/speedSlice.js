import {createSlice} from "@reduxjs/toolkit";
import { nextText} from "./textsSlice";

const initialState = {
	value: 0,
};

const speedSlice = createSlice({
	name: 'speed',
	initialState,
	reducers: {}
	
})