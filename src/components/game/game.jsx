import React, {useState} from 'react';
import style from './game.module.scss';
import {useSelector, useDispatch} from "react-redux";


const Game = () => {
	const text = useSelector((state) => state.texts.value)
	const dispatch = useDispatch();
	
	return (
		<div className={style.theGame}>
			<p className={style.text}>
				{text}
			</p>
		</div>
	);
};

export default Game;

