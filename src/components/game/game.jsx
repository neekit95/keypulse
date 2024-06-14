import React, { useEffect, useRef, useState } from 'react';
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
	const inputRef = useRef(null);
	const [currentInput, setCurrentInput] = useState('');
	
	useEffect(() => {
		if (correctSymbols === text.length) {
			dispatch(stopTimerThunk());
			dispatch(endGame());
		} else if (timer > 0 && !isGameEnd) {
			const speed = (correctSymbols / timer) * 60;
			dispatch(updateSpeed(speed));
		}
	}, [correctSymbols, timer, isGameEnd, text.length, dispatch]);
	
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);
	
	const handleKeyDown = (e) => {
		if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt') {
			return;
		}
		const value = e.key;
		setCurrentInput(value);
		
		if (!isGameStarted && !isGameEnd) {
			dispatch(startGame());
			dispatch(startTimerThunk());
		}
		
		if (value !== text[currentIndex]) {
			dispatch(addError(currentIndex));
			return;
		}
		
		dispatch(correctError());
		dispatch(incrementCorrectSymbols());
		dispatch(updateInputText(inputText + value));
	};
	
	return (
		<div className={style.theGame} tabIndex="0" onKeyDown={handleKeyDown} ref={inputRef}>
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
		</div>
	);
};

export default Game;
