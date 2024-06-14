import React from 'react';
import style from './admin-panel.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "../../redux/slices/textsSlice";

const AdminPanel = () => {
	const currentSymbols = useSelector((state) => state.texts.correctSymbols);
	const timer = useSelector((state) => state.timer.value);
	const speed = useSelector((state) => state.speed.value);
	const errorCount = useSelector((state) => state.texts.errorCount);
	const dispatch = useDispatch();
	
	const handleReset = () => {
		dispatch(resetGame());
		window.location.reload(); // перезагрузка страницы для сброса состояния
	};
	
	return (
		<div className={style.container}>
			<p>Число знаков:
				<span>{currentSymbols}</span>
			</p>
			<p>Таймер:
				<button onClick={handleReset}>Заново</button>
				<span>{timer}</span>
			</p>
			<p>Скорость Зн/м:
				<span>{speed.toFixed(2)}</span>
			</p>
			<p>Ошибки:
				<span>{errorCount}</span>
			</p>
			<p>Язык ввода:
				<span>{navigator.language}</span>
			</p>
		</div>
	);
};

export default AdminPanel;
