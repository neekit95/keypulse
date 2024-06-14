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
	currentIndex: 0,
	currentSymbols: texts[0].length,
	errorCount: 0,
	correctSymbols: 0,
	isGameStarted: false
};

const textsSlice = createSlice({
	name: 'texts',
	initialState,
	reducers: {
		updateInputText: (state, action) => {
			state.inputText = action.payload;
			state.currentIndex += 1;
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
			state.errorCount = 0;
			state.correctSymbols = 0;
			state.currentIndex = 0;
			state.isGameStarted = false;
		},
		incrementCorrectSymbols: (state) => {
			state.correctSymbols += 1;
		},
		startGame: (state) => {
			state.isGameStarted = true;
		},
		nextText: (state) => {
			state.currentIndex = (state.currentIndex + 1) % texts.length;
			state.value = texts[state.currentIndex];
			state.currentError = null;
			state.inputText = '';
			state.isGameEnd = false;
			state.errorCount = 0;
			state.correctSymbols = 0;
			state.isGameStarted = false;
			state.currentSymbols = texts[state.currentIndex].length;
			
				// currentIndex: 0,
				// value: texts[0],
				// inputText: '',
				// currentError: null,
				// isGameEnd: false,
				// currentSymbols: texts[0].length,
				// errorCount: 0,
				// correctSymbols: 0,
				// isGameStarted: false
			
		}
	},
});

export const { updateInputText, addError, correctError, endGame, resetGame,nextText, incrementCorrectSymbols, startGame } = textsSlice.actions;
export default textsSlice.reducer;
