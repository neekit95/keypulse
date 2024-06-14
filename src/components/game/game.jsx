import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { updateSpeed } from '../../redux/slices/speedSlice';
import { updateInputText, addError, correctError, endGame, incrementCorrectSymbols, startGame, resetGame } from '../../redux/slices/textsSlice';
import { startTimerThunk, stopTimerThunk, resetTimer } from '../../redux/slices/timerSlice';
import style from './game.module.scss';

Modal.setAppElement('#root'); // Устанавливаем элемент для aria

const Game = () => {
	const text = useSelector((state) => state.texts.value);
	const { inputText, currentError, currentIndex, isGameEnd, correctSymbols, isGameStarted, errorCount } = useSelector((state) => state.texts);
	// const currentSymbols = useSelector((state) => state.texts.correctSymbols);
	
	const timer = useSelector((state) => state.timer.value);
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	useEffect(() => {
		if (correctSymbols === text.length) {
			dispatch(stopTimerThunk());
			dispatch(endGame());
			setIsModalOpen(true);
		} else if (timer > 0 && !isGameEnd) {
			const speed = Math.round((correctSymbols / (timer / 100)) * 6); // Преобразование таймера в секунды и округление до целого числа
			dispatch(updateSpeed(speed));
		}
	}, [correctSymbols, timer, isGameEnd, text.length, dispatch]);
	
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
	};
	
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	
	const handleRestart = () => {
		dispatch(resetGame());
		dispatch(resetTimer());
		setIsModalOpen(false);
	};
	
	return (
		<div className={style.theGame} tabIndex="0" onKeyPress={handleKeyPress}>
			<p className={style.text}>
				{text.split('').map((char, index) => (
					<span
						key={index}
						className={
							currentError === index ? style.error :
								index === currentIndex ? style.nextChar :
									index < inputText.length ? style.correct : ''
						}
					>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
				))}
			</p>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleCloseModal}
				contentLabel="Результаты игры"
				className={style.modal}
				overlayClassName={style.overlay}
			>
				<h2>Результаты игры</h2>
				<div className={style.results}>
					<p>Количество ошибок:<span>{errorCount}</span></p>
					<p>Точность (%):<span>{errorCount}</span></p>
					<p>Скорость (зн/мин): <span>
						{Math.round((correctSymbols / (timer / 100)) * 6)}
					</span></p>
				</div>
				<button onClick={handleRestart}>Начать заново</button>
			</Modal>
		</div>
	);
};

export default Game;
