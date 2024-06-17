import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSpeed } from '../../redux/slices/speedSlice';
import { nextText } from '../../redux/slices/textsSlice';
import { resetTimer, startTimerThunk, stopTimerThunk } from '../../redux/slices/timerSlice';
import { RiSpeedUpLine } from 'react-icons/ri';
import { LuCircleDot } from 'react-icons/lu';
import { MdOutlineRestartAlt } from 'react-icons/md';
import style from './options.module.scss';

const Options = () => {
	const dispatch = useDispatch();
	const speed = useSelector((state) => state.speed.value);
	const { isGameStarted, correctSymbols, errorCount } = useSelector((state) => state.texts);
	const timer = useSelector((state) => state.timer.value);
	const accuracy = useSelector((state) => state.accuracy.value);
	
	useEffect(() => {
		if (isGameStarted && timer > 0) {
			const intervalId = setInterval(() => {
				if (timer > 0) {
					const newSpeed = Math.round((correctSymbols / (timer / 10)) * 60);
					dispatch(updateSpeed(newSpeed));
				}
			}, 1000); // Обновление скорости для пользователя каждую секунду
			
			return () => clearInterval(intervalId);
		}
	}, [isGameStarted, correctSymbols, timer, dispatch]);
	
	return (
		<div className={style.options}>
			<div className={style.option}>
				<div className={style.sign}>
					<RiSpeedUpLine />
					<p>Скорость</p>
				</div>
				<div className={style.defenition}>
					{isGameStarted && !isNaN(speed) ? speed : 0} Зн/м
				</div>
			</div>
			
			<div className={style.option}>
				<div className={style.sign}>
					<LuCircleDot />
					<p className={style.p}>Точность</p>
				</div>
				<div className={style.defenition}>
					{isGameStarted && !isNaN(accuracy) ? accuracy : '100.0'}%
				</div>
			</div>
			
			<div className={style.restart}>
				<button
					onClick={() => {
						dispatch(nextText());
						dispatch(stopTimerThunk());
						dispatch(resetTimer());
						
					}}
				>
					<MdOutlineRestartAlt className={style.restartIcon} />
					<p>Заново</p>
				</button>
			</div>
		</div>
	);
};

export default Options;
