import { createSlice } from "@reduxjs/toolkit";

const texts = [
	'Фродо встал, тяжело опираясь на свою палку...',
	'Когда Маленький принц подошел к фонарщику...',
	'Взгляд Уинстона скользнул по мрачным улицам Лондона...'
];

const initialState = {
	value: texts[0],
	currentIndex: 0,
	currentSymbols: texts[0].length,
	inputText: "",
	errorCount: 0,
	currentError: null,
};

const textsSlice = createSlice({
	name: 'texts',
	initialState,
	reducers: {
		nextText: (state) => {
			state.currentIndex = (state.currentIndex + 1) % texts.length;
			state.value = texts[state.currentIndex];
			state.currentSymbols = texts[state.currentIndex].length;
			state.inputText = "";
			state.errorCount = 0;
			state.currentError = null;
		},
		updateInputText: (state, action) => {
			state.inputText = action.payload;
		},
		addError: (state, action) => {
			state.errorCount += 1;
			state.currentError = action.payload;
		},
		correctError: (state) => {
			state.currentError = null;
		},
	},
});

export const { nextText, updateInputText, addError, correctError } = textsSlice.actions;
export default textsSlice.reducer;
