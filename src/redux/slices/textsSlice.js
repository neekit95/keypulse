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
	currentIndex: 0, // Индекс текущего знака
	totalSymbols: texts[0].length, // Общее количество символов для текущего текста
	errorCount: 0,
	correctSymbols: 0,
	isGameStarted: false,
	currentTextIndex: 0, // Индекс текущего текста
	lastErrorIndex: null
};

const textsSlice = createSlice({
	name: 'texts',
	initialState,
	reducers: {
		updateInputText: (state, action) => {
			if (state.isGameEnd) return; // Предотвращение учета ошибок после завершения игры
			state.inputText = action.payload;
			state.currentIndex += 1;
		},
		addError: (state, action) => {
			if (state.isGameEnd) return;
			
			// Получаем текущий индекс ошибки
			const errorIndex = action.payload;
			
			// Проверяем, была ли уже учтена ошибка на этом индексе
			if (state.lastErrorIndex !== errorIndex) {
				state.currentError = errorIndex;
				state.errorCount += 1;
				state.lastErrorIndex = errorIndex; // Обновляем последнюю ошибку
			}
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
			state.isGameStarted = false;
			// state.currentSymbols = texts[state.currentTextIndex].length;
			state.value = texts[state.currentTextIndex]; // Используем текущий индекс для сброса текста
			state.totalSymbols = texts[state.currentTextIndex].length; // Обновление общего количества символов для текущего текста
			state.lastErrorIndex = null;
		},
		incrementCorrectSymbols: (state) => {
			if (state.isGameEnd) return; // Предотвращение учета ошибок после завершения игры
			state.correctSymbols += 1;
		},
		startGame: (state) => {
			state.isGameStarted = true;
		},
		nextText: (state) => {
			state.currentTextIndex = (state.currentTextIndex + 1) % texts.length; // Переход к следующему тексту
			state.value = texts[state.currentTextIndex]; // Используем текущий индекс для сброса текста
			state.currentIndex = 0;
			state.currentSymbols = texts[state.currentIndex].length;
			state.totalSymbols = texts[state.currentIndex].length; // Обновление общего количества символов для текущего текста
			state.inputText = ''; // Сброс ввода
			state.currentError = null;
			state.isGameEnd = false;
			state.errorCount = 0;
			state.correctSymbols = 0;
			state.isGameStarted = false;
			state.lastErrorIndex = null;
		}
	},
});

export const { updateInputText, addError, correctError, endGame, resetGame, nextText, incrementCorrectSymbols, startGame } = textsSlice.actions;
export default textsSlice.reducer;
