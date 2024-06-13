import React, { useEffect } from 'react';
import style from './game.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { updateInputText, addError, correctError } from "../../redux/slices/textsSlice";

const Game = () => {
	const text = useSelector((state) => state.texts.value);
	const inputText = useSelector((state) => state.texts.inputText);
	const currentError = useSelector((state) => state.texts.currentError);
	const dispatch = useDispatch();
	
	const handleKeyPress = (e) => {
		if (currentError === null) {
			if (text[inputText.length] === e.key) {
				dispatch(updateInputText(inputText + e.key));
			} else {
				dispatch(addError(inputText.length));
			}
		} else if (text[currentError] === e.key) {
			dispatch(correctError());
			dispatch(updateInputText(inputText.slice(0, currentError) + e.key));
		}
	};
	
	useEffect(() => {
		window.addEventListener("keypress", handleKeyPress);
		return () => {
			window.removeEventListener("keypress", handleKeyPress);
		};
	}, [inputText, currentError]);
	
	const renderText = () => {
		return text.split('').map((char, index) => {
			let color = 'black';
			if (index < inputText.length) {
				color = char === inputText[index] ? 'green' : 'red';
			}
			if (index === currentError) {
				color = 'red';
			}
			return (
				<span key={index} style={{ color: color }}>
          {char}
        </span>
			);
		});
	};
	
	return (
		<div className={style.theGame}>
			<p className={style.text}>
				{renderText()}
			</p>
		</div>
	);
};

export default Game;
