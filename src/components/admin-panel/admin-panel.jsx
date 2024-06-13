import React from 'react';
import style from './admin-panel.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {stopTimerThunk} from '../../redux/slices/timerSlice';

const AdminPanel = () => {
	const currentSymbols = useSelector((state) => state.texts.currentSymbols);
	const timer = useSelector((state) => state.timer.value);
	const speed = useSelector((state) => state.speed.value);
	const errorCount = useSelector((state) => state.texts.errorCount);
	const correctSymbols = useSelector((state) => state.texts.correctSymbols);
	const dispatch = useDispatch();
	
	return (
		<div className={style.container}>
			<p> Число знаков:
				<span>
          {currentSymbols}
        </span>
			</p>
			<p> Таймер:
				<button onClick={() => dispatch(stopTimerThunk())}>Остановить</button>
				<span>
          {timer}
        </span>
			</p>
			<p>
				Скорость Зн/м:
				<span>
          {speed.toFixed(2)}
        </span>
			</p>
			<p>
				Ошибки:
				<span>
          {errorCount}
        </span>
			</p>
			<p>
				Правильные знаки:
				<span>
          {correctSymbols}
        </span>
			</p>
		</div>
	);
};

export default AdminPanel;
