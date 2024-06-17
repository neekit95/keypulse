import { createSlice } from "@reduxjs/toolkit";

const texts = [
	'Фродо встал, тяжело опираясь на свою палку. Его ноги дрожали, а глаза искали знакомые лица среди собравшихся. Он почувствовал, как сердце сжалось от боли и радости одновременно. Он больше не был тем хоббитом, который отправился в это долгое и опасное путешествие. Он изменился навсегда, и это чувствовали все, кто был рядом. Гэндальф подошел к нему и положил руку на плечо. "Ты прошел через многое, мой дорогой друг," сказал он тихо. "Но теперь все закончено. Ты можешь вернуться домой и жить в мире." Фродо улыбнулся, чувствуя, как слезы текут по его щекам. Он знал, что впереди еще много трудностей, но теперь он был готов к ним.',
	'Когда Маленький принц подошел к фонарщику, он увидел, как тот быстро зажигает и гасит фонарь. "Почему ты это делаешь?" спросил принц. "Это моя работа," ответил фонарщик. "Каждый день я зажигаю фонарь вечером и гашу его утром." "Но это так утомительно," заметил Маленький принц. "Да," согласился фонарщик, "но я должен следовать приказу." Маленький принц подумал, что этот человек напоминает ему взрослого, который забыл о простых радостях жизни. "А что будет, если ты перестанешь зажигать и гасить фонарь?" спросил он. "Я потеряю свою работу," ответил фонарщик. Маленький принц грустно покачал головой и продолжил свой путь, думая о том, как взрослые люди тратят свою жизнь на бессмысленные дела.',
	'Взгляд Уинстона скользнул по мрачным улицам Лондона. Большой Брат наблюдал за всеми, и это чувствовалось в каждом углу города. Уинстон знал, что каждый его шаг может быть прослушан или записан. Он чувствовал себя как мышь в лабиринте, откуда нет выхода. Каждый день был похож на предыдущий: работа, пропаганда, контроль. Но внутри него теплилась искра сопротивления. Он не мог забыть о том, что когда-то было иначе. Он мечтал о свободе и правде, но знал, что за такие мечты можно поплатиться жизнью. Однажды он решил написать дневник, надеясь, что его мысли смогут изменить мир. Уинстон понимал, что его борьба может быть бесполезной, но он не мог предать свои идеалы. И даже в самые темные дни он верил, что правда и свобода все равно победят.'
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
