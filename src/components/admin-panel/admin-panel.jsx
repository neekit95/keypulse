import React from 'react';
import style from './admin-panel.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { stopTimerThunk } from "../../redux/slices/timerSlice";

const AdminPanel = () => {
	const currentSymbols = useSelector((state) => state.texts.currentSymbols);
	const timer = useSelector((state) => state.timer.value);
	const speed = useSelector((state) => state.speed.value);
	const errorCount = useSelector((state) => state.texts.errorCount);
	const dispatch = useDispatch();
	
	const handleStop = () => {
		dispatch(stopTimerThunk());
	};
	
	return (
		<div className={style.container}>
			<p>Число знаков: {currentSymbols}</p>
			<p>Таймер: <button onClick={handleStop}>Остановить</button> {timer}</p>
			<p>Скорость Зн/м: {speed}</p>
			<p>Ошибки: {errorCount}</p>
		</div>
	);
};

export default AdminPanel;
