import React from 'react';
import style from './admin-panel.module.scss';
import {useSelector, useDispatch} from "react-redux";


const AdminPanel = () => {
	const currentSymbols = useSelector((state) => state.texts.currentSybols)
	const timer = useSelector((state) => state.timer.value);
	
	return (
		<div className={style.container}>
			<p> Число знаков:  {currentSymbols}</p>
			<p> Таймер: {timer}</p>
		</div>
	);
};

export default AdminPanel;

