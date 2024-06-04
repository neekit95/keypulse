import style from './app.module.scss';
import Header from "../header/header";
import {RiSpeedUpLine} from "react-icons/ri";

const App = () => {
	
	const arr = () => {
	
	}
	return (
		<div className={style.container}>
			
			<Header/>
			
			<div className="wrapper">
				<div className={style.main}>
					<div className={style.theGame}>
						game
					</div>
					
					<div className={style.options}>
						<div className={style.option}>
							<RiSpeedUpLine />
							<p className={style.p}>Speed</p>
						</div>
						
						<div className={style.option}>
							<RiSpeedUpLine/>
							Accuracy
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;

