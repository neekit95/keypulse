import style from "./options.module.scss";
import {RiSpeedUpLine} from "react-icons/ri";
import {LuCircleDot} from "react-icons/lu";
import {MdOutlineRestartAlt} from "react-icons/md";



function Options(props) {
	return <div className={style.options}>
		
		<div className={style.option}>
			<div className={style.sign}>
				<RiSpeedUpLine/>
				<p className={style.p}>
					Speed
				</p>
			</div>
			<div className={style.defenition}>
				{props.speed} Зн/м
			</div>
		</div>
		
		<div className={style.option}>
			
			<div className={style.sign}>
				<LuCircleDot/>
				<p className={style.p}>Accuracy</p>
			</div>
			
			<div className={style.defenition}>
				{props.accuracy}%
			</div>
		
		</div>
		
		<div className={style.restart}>
			<button>
				<MdOutlineRestartAlt className={style.restartIcon}/>
				<p>Restart</p>
			</button>
		</div>
	</div>;
}

export default Options;
