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
	isGameStarted: false, // Новое состояние
};

const textsSlice = createSlice({
	name: 'texts',
	initialState,
	reducers: {
		updateInputText: (state, action) => {
			state.inputText = action.payload;
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
			state.isGameStarted = false; // Остановка игры при завершении
		},
		resetGame: (state) => {
			state.inputText = '';
			state.currentError = null;
			state.isGameEnd = false;
			state.errorCount = 0;
			state.correctSymbols = 0;
			state.currentIndex = 0;
			state.isGameStarted = false; // Сброс состояния игры
		},
		incrementCorrectSymbols: (state) => {
			state.correctSymbols += 1;
			state.currentIndex += 1;
		},
		startGame: (state) => {
			state.isGameStarted = true; // Начало игры
		},
	},
});

export const { updateInputText, addError, correctError, endGame, resetGame, incrementCorrectSymbols, startGame } = textsSlice.actions;
export default textsSlice.reducer;
