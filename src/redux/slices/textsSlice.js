import {createSlice} from "@reduxjs/toolkit";

const texts = [
	'Фродо встал, тяжело опираясь на свою палку. Его ноги дрожали, а глаза искали знакомые лица среди собравшихся. Он почувствовал, как сердце сжалось от боли и радости одновременно. Он больше не был тем хоббитом, который отправился в это долгое и опасное путешествие. Он изменился навсегда, и это чувствовали все, кто был рядом. Гэндальф подошел к нему и положил руку на плечо. "Ты прошел через многое, мой дорогой друг," сказал он тихо. "Но теперь все закончено. Ты можешь вернуться домой и жить в мире." Фродо улыбнулся, чувствуя, как слезы текут по его щекам. Он знал, что впереди еще много трудностей, но теперь он был готов к ним.',
	'Когда Маленький принц подошел к фонарщику, он увидел, как тот быстро зажигает и гасит фонарь. "Почему ты это делаешь?" спросил принц. "Это моя работа," ответил фонарщик. "Каждый день я зажигаю фонарь вечером и гашу его утром." "Но это так утомительно," заметил Маленький принц. "Да," согласился фонарщик, "но я должен следовать приказу." Маленький принц подумал, что этот человек напоминает ему взрослого, который забыл о простых радостях жизни. "А что будет, если ты перестанешь зажигать и гасить фонарь?" спросил он. "Я потеряю свою работу," ответил фонарщик. Маленький принц грустно покачал головой и продолжил свой путь, думая о том, как взрослые люди тратят свою жизнь на бессмысленные дела.',
	'Взгляд Уинстона скользнул по мрачным улицам Лондона. Большой Брат наблюдал за всеми, и это чувствовалось в каждом углу города. Уинстон знал, что каждый его шаг может быть прослушан или записан. Он чувствовал себя как мышь в лабиринте, откуда нет выхода. Каждый день был похож на предыдущий: работа, пропаганда, контроль. Но внутри него теплилась искра сопротивления. Он не мог забыть о том, что когда-то было иначе. Он мечтал о свободе и правде, но знал, что за такие мечты можно поплатиться жизнью. Однажды он решил написать дневник, надеясь, что его мысли смогут изменить мир. Уинстон понимал, что его борьба может быть бесполезной, но он не мог предать свои идеалы. И даже в самые темные дни он верил, что правда и свобода все равно победят.'
];

const initialState = {
	value: texts[0],
	currentIndex : 0,
	currentSybols: texts[0].length,
}

const textsSlice = createSlice({
	name:'texts',
	initialState,
	reducers: {
		nextText: (state) => {
			state.currentIndex = (state.currentIndex + 1) % texts.length;
			state.value = texts[state.currentIndex];
			state.currentSybols = texts[state.currentIndex].length
		},
	},
});

export const {nextText} = textsSlice.actions;
export default textsSlice.reducer;