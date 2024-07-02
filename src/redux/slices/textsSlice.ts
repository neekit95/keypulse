import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const texts: string[] = [
    'Величественный и внушительный, он смотрел сверху вниз, как будто господствовал над всеми. За его спиной виднелись бесконечные ряды зданий, и все окна их были одинаковыми. Его лицо было серьезным и строго взирающим, а глаза пронизывали насквозь.',

    'В этом мире есть добро, и за него стоит бороться. Но зло тоже сильно, и, когда кажется, что надежды нет, когда тьма сгущается, важно помнить, что свет всегда пробивается даже через самые густые облака.',

    'Его улыбка, словно олицетворение радости и надежды, отражала свет, который он излучал. В его глазах светились мечты, но также и печаль утрат. Он был готов делиться своей радостью с каждым, кто входил в его дом, как будто он нашел секрет счастья и хотел поделиться им с миром',

    'Его улыбка, словно олицетворение радости и надежды, отражала свет, который он излучал. В его глазах светились мечты, но также и печаль утрат. Он был готов делиться своей радостью с каждым, кто входил в его дом, как будто он нашел секрет счастья и хотел поделиться им с миром',

    'Судья сидел высоко на возвышении, смотря вниз на всех нас. Его лицо было спокойно и непроницаемо, словно высечено из камня. Мы сидели в душном зале суда, каждый погруженный в свои мысли, ощущая напряжение и весомость момента, который казался бесконечным.',

    'Зима близко, и, когда снег покроет землю, мир изменится навсегда. Серые стены Винтерфелла возвышались над нами, защищая нас от ветров и опасностей, но в сердце каждого из нас жила тревога. Время шло, и тени сгущались, предвещая неизбежное.'
];

// const texts = ['1', '2', '3', '4', '5']

const getRandomIndex = (): number => Math.floor(Math.random() * texts.length);
const randomIndex: number = getRandomIndex();

interface InitialState {
    value: string;
    inputText: string;
    currentError: null | number;
    isGameEnd: boolean;
    currentIndex: number;
    totalSymbols: number;
    errorCount: number;
    correctSymbols: number;
    isGameStarted: boolean;
    currentTextIndex: number;
    lastErrorIndex: null | number;
}

const initialState: InitialState = {
    value: texts[randomIndex],
    inputText: '',
    currentError: null,
    isGameEnd: false,
    currentIndex: 0, // Индекс текущего знака
    totalSymbols: texts[randomIndex].length, // Общее количество символов для текущего текста
    errorCount: 0,
    correctSymbols: 0,
    isGameStarted: false,
    currentTextIndex: randomIndex, // Индекс текущего текста
    lastErrorIndex: null
};

const textsSlice = createSlice({
    name: 'texts',
    initialState,
    reducers: {
        updateInputText: (state, action: PayloadAction<string>) => {
            if (state.isGameEnd) return; // Предотвращение учета ошибок после завершения игры
            state.inputText = action.payload;
            state.currentIndex += 1;
        },
        addError: (state, action: PayloadAction<number>) => {
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
            // state.currentSymbols = texts[state.currentIndex].length;
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

export const {
    updateInputText,
    addError,
    correctError,
    endGame,
    resetGame,
    nextText,
    incrementCorrectSymbols,
    startGame
} = textsSlice.actions;
export default textsSlice.reducer;
