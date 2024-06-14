import style from "./options.module.scss";
import { RiSpeedUpLine } from "react-icons/ri";
import { LuCircleDot } from "react-icons/lu";
import { MdOutlineRestartAlt } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import { nextText } from "../../redux/slices/textsSlice";
import {resetTimer, startTimerThunk, stopTimerThunk} from "../../redux/slices/timerSlice";
import React from "react";

function Options(props) {
	const dispatch = useDispatch();
	const speed = useSelector((state) => state.speed.value);
	const { correctSymbols, errorCount, isGameStarted } = useSelector((state) => state.texts);
	// const accuracy = Math.round((correctSymbols / (correctSymbols + errorCount)) * 100)
	const accuracy = useSelector((state) => state.accuracy.value)
	return (
		<div className={style.options}>
			<div className={style.option}>
				<div className={style.sign}>
					<RiSpeedUpLine />
					<p>
						Скорость
					</p>
				</div>
				<div className={style.defenition}>
					{ isGameStarted ? speed : 0} Зн/м
				</div>
			</div>
			
			<div className={style.option}>
				<div className={style.sign}>
					<LuCircleDot />
					<p className={style.p}>Точность</p>
				</div>
				
				<div className={style.defenition}>
					{isGameStarted ?  accuracy: '100' }
					 %
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
}

export default Options;
