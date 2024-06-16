import React, { useState, useEffect } from 'react';
import style from './admin-panel.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "../../redux/slices/textsSlice";
import { updateSpeed } from "../../redux/slices/speedSlice";

const AdminPanel = () => {
	const currentSymbols = useSelector((state) => state.texts.correctSymbols);
	const totalSymbols = useSelector((state) => state.texts.totalSymbols);
	const timer = useSelector((state) => state.timer.value);
	const errorCount = useSelector((state) => state.texts.errorCount);
	const dispatch = useDispatch();
	const [speed, setSpeed] = useState(0);
	const [currentLanguage, setCurrentLanguage] = useState('');
	
	useEffect(() => {
		const handleKeyPress = (event) => {
			const charCode = event.charCode || event.keyCode; // получаем код символа из события
			// Проверяем, принадлежит ли символ русскому алфавиту
			if ((charCode >= 1040 && charCode <= 1103) || charCode === 1025 || charCode === 1105) {
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
	
	const handleReset = () => {
		dispatch(resetGame());
		window.location.reload(); // перезагрузка страницы для сброса состояния
	};
	return (
		<div className={style.container}>
			<p>Число набранных символов:
				<span>{currentSymbols}</span>
			</p>
			<p>Общее число символов:
				<span>{totalSymbols}</span>
			</p>
			<p>Таймер:
				<span>{timer}</span>
			</p>
			<p>Скорость Зн/м:
				<span>{speed.toFixed(2)}</span>
			</p>
			<p>Ошибки:
				<span>{errorCount}</span>
			</p>
			<p>Язык ввода:
				<span>{currentLanguage || 'Unknown'}</span>
			</p>
		</div>
	);
};

export default AdminPanel;
