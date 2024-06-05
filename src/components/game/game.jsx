import React, {useState} from 'react';
import style from './game.module.scss';

const Game = () => {

	
	return (
		<div className={style.theGame}>
			<p className={style.text}>
				{text}
			</p>
		</div>
	);
};

export default Game;

