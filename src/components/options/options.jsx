import style from "./options.module.scss";
import { RiSpeedUpLine } from "react-icons/ri";
import { LuCircleDot } from "react-icons/lu";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { nextText } from "../../redux/slices/textsSlice";
import { startTimerThunk, resetTimer } from "../../redux/slices/timerSlice";


function Options(props) {
	const dispatch = useDispatch();
	
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
					{props.speed} Зн/м
				</div>
			</div>
			
			<div className={style.option}>
				<div className={style.sign}>
					<LuCircleDot />
					<p className={style.p}>Точность</p>
				</div>
				
				<div className={style.defenition}>
					{props.accuracy}%
				</div>
			
			</div>
			
			<div className={style.restart}>
				<button
					onClick={() => {
						dispatch(nextText());
						dispatch(resetTimer());
						// dispatch(startTimerThunk());
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
