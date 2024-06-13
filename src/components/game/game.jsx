import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSpeed } from '../../redux/slices/speedSlice';
import { updateInputText, addError, correctError, endGame, incrementCorrectSymbols, startGame } from '../../redux/slices/textsSlice';
import { startTimerThunk, stopTimerThunk } from '../../redux/slices/timerSlice';
import style from './game.module.scss';

const Game = () => {
	const text = useSelector((state) => state.texts.value);
	const { inputText, currentError, currentIndex, isGameEnd, correctSymbols, isGameStarted } = useSelector((state) => state.texts);
	const timer = useSelector((state) => state.timer.value);
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (correctSymbols === text.length) {
			dispatch(stopTimerThunk());
			dispatch(endGame());
		} else if (timer > 0 && !isGameEnd) {
			const speed = (correctSymbols / timer) * 60;
			dispatch(updateSpeed(speed));
		}
	}, [correctSymbols, timer, isGameEnd, text.length, dispatch]);
	
	const handleChange = (e) => {
		const value = e.target.value;
		if (!isGameStarted && !isGameEnd) {
			dispatch(startGame());
			dispatch(startTimerThunk());
		}
		
		if (value[currentIndex] !== text[currentIndex]) {
			dispatch(addError(currentIndex));
			return;
		}
		
		dispatch(correctError());
		dispatch(incrementCorrectSymbols());
		dispatch(updateInputText(value));
	};
	
	return (
		<div className={style.theGame}>
			<p className={style.text}>
				{text.split('').map((char, index) => (
					<span
						key={index}
						className={
							index === currentIndex ? style.nextChar :
								currentError === index ? style.error :
									index < inputText.length ? style.correct : ''
						}
					>
            {char === ' ' ? '\u00A0' : char}
          </span>
				))}
			</p>
			<input
				type="text"
				value={inputText}
				onChange={handleChange}
				// disabled={isGameEnd}
			/>
		</div>
	);
};

export default Game;
