import { createSlice } from "@reduxjs/toolkit";

const texts = [
	'Фродо встал, тяжело опираясь на свою палку...',
	'Когда Маленький принц подошел к фонарщику...',
	'Взгляд Уинстона скользнул по мрачным улицам Лондона...'
];

const initialState = {
	value: texts[0],
	inputText: '',
	currentError: null,
	isGameEnd: false,
	isGameStarted: false,
	currentIndex: 0,
	currentSymbols: texts[0].length,
	errorCount: 0,
	correctSymbols: 0,
};

const textsSlice = createSlice({
	name: 'texts',
	initialState,
	reducers: {
		updateInputText: (state, action) => {
			state.inputText = action.payload;
			state.currentIndex = action.payload.length;
		},
		addError: (state, action) => {
			state.currentError = action.payload;
			state.errorCount += 1;
		},
		correctError: (state) => {
			state.currentError = null;
		},
		endGame: (state) => {
			state.isGameEnd = true;
		},
		resetGame: (state) => {
			state.inputText = '';
			state.currentError = null;
			state.isGameEnd = false;
			state.isGameStarted = false;
			state.errorCount = 0;
			state.correctSymbols = 0;
		},
		incrementCorrectSymbols: (state) => {
			state.correctSymbols += 1;
		},
		startGame: (state) => {
			state.isGameStarted = true;
		}
	},
});

export const { updateInputText, addError, correctError, endGame, resetGame, incrementCorrectSymbols, startGame } = textsSlice.actions;
export default textsSlice.reducer;
