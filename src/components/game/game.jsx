import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-modal';
import {calculateSpeed, updateSpeed} from '../../redux/slices/speedSlice';
import {
	addError,
	correctError,
	endGame,
	incrementCorrectSymbols,
	nextText,
	startGame,
	updateInputText,
} from '../../redux/slices/textsSlice';
import {resetTimer, startTimerThunk, stopTimerThunk} from '../../redux/slices/timerSlice';
import style from './game.module.scss';
import {updateAccuracy} from '../../redux/slices/accuracySlice';

Modal.setAppElement('#root'); // Устанавливаем элемент для aria

const Game = () => {
	const text = useSelector((state) => state.texts.value);
	const {inputText, currentError, currentIndex, isGameEnd, correctSymbols, isGameStarted, errorCount} = useSelector(
		(state) => state.texts
	);
	const timer = useSelector((state) => state.timer.value);
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const gameRef = useRef(null);
	const modalButtonRef = useRef(null);
	const accuracy = ((correctSymbols / (correctSymbols + errorCount)) * 100).toFixed(1);
	const [isCorrectLanguage, setIsCorrectLanguage] = useState(false);
	
	useEffect(() => {
		gameRef.current.focus(); // Фокусировка на игре при загрузке страницы и начале игры
	}, []);
	
	useEffect(() => {
		if (isModalOpen) {
			setTimeout(() => {
				if (modalButtonRef.current) {
					modalButtonRef.current.focus();
				}
			}, 0);
		}
	}, [isModalOpen]);
	
	useEffect(() => {
		if (correctSymbols === text.length) {
			dispatch(stopTimerThunk());
			dispatch(endGame());
			dispatch(calculateSpeed({correctSymbols, timer}));
			setIsModalOpen(true);
		} else if (timer > 0 && !isGameEnd) {
			dispatch(updateAccuracy(accuracy));
		}
	}, [correctSymbols, timer, isGameEnd, text.length, dispatch, accuracy]);
	
	const handleKeyPress = (e) => {
		const char = e.key;
		if (!isGameStarted && !isGameEnd) {
			dispatch(startGame());
			dispatch(startTimerThunk());
		}
		
		if (char !== text[currentIndex]) {
			dispatch(addError(currentIndex));
			return;
		}
		
		dispatch(correctError());
		dispatch(incrementCorrectSymbols());
		dispatch(updateInputText(inputText + char));
		dispatch(updateSpeed(Math.round(correctSymbols / (timer / 10) * 60))); // Обновление скорости при каждом верно введенном символе
	};
	
	const handleRestart = () => {
		dispatch(nextText()); // Переход к следующему тексту при перезапуске
		dispatch(resetTimer());
		setIsModalOpen(false);
		gameRef.current.focus(); // Фокусировка на игре после перезапуска
	};
	
	const [currentLanguage, setCurrentLanguage] = useState('');
	
	useEffect(() => {
		const handleKeyPress = (event) => {
			const char = event.key;
			
			// Проверяем, является ли символ знаком пунктуации или пробелом
			if (/[.,\/#!$%\^&\*;:{}=\-_`~() ]/.test(char)) {
				setCurrentLanguage('sign');
			}
			// Проверяем, принадлежит ли символ русскому алфавиту
			else if ((char >= 'а' && char <= 'я') || char === 'ё' || (char >= 'А' && char <= 'Я')) {
				setCurrentLanguage('Russian');
			} else {
				setCurrentLanguage('English');
			}
		};
		
		// Добавляем слушатель события keypress для определения языка при вводе символов
		document.addEventListener('keypress', handleKeyPress);
		return () => {
			// Убираем слушатель при размонтировании компонента
			document.removeEventListener('keypress', handleKeyPress);
		};
	}, []);
	
	
	return (
		<div className={style.theGame} tabIndex="0" onKeyPress={handleKeyPress} ref={gameRef}>
			
			{
				currentLanguage === 'English' ? (
					<div className={
						currentLanguage === 'English' ? style.language : style.languageNone}>
						Переключите язык
					</div>
				) : null
			}
			<p className={style.text}>
				{text.split('').map((char, index) => (
					<span
						key={index}
						className={
							currentError === index
								? style.error
								: index === currentIndex
									? style.nextChar
									: index < inputText.length
										? style.correct
										: ''
						}
					>
        {char === ' ' ? '\u00A0' : char}
      </span>
				))}
			</p>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleRestart}
				contentLabel="Результаты игры"
				className={style.modal}
				overlayClassName={style.overlay}
			>
				<h2>Результаты игры</h2>
				<div className={style.results}>
					<p>
						Количество ошибок:<span>{errorCount}</span>
					</p>
					<p>
						Точность (%):<span>{accuracy}</span>
					</p>
					<p>
						Скорость (зн/мин): <span>{useSelector((state) => state.speed.value)}</span>
					</p>
				</div>
				<button onClick={handleRestart} ref={modalButtonRef}>
					Начать заново
				</button>
			</Modal>
		</div>
	);
};

export default Game;

