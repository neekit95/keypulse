import style from './app.module.scss';
import Header from "../header/header";
import {useState} from "react";
import Options from "../options/options";
import Game from "../game/game";

const App = () => {
	const [speed, setSpeed] = useState(0);
	const [accuracy, setAccuracy] = useState(100);
	return (
		<div className={style.container}>
			
			<Header/>
			
			<div className="wrapper">
				<div className={style.main}>
					<Game/>
					
					<Options speed={speed} accuracy={accuracy}/>
				
				</div>
			</div>
		</div>
	);
};

export default App;

