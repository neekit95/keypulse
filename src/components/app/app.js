import style from './app.module.scss';
import Header from "../header/header";
import {useState} from "react";
import Options from "../options/options";
import Game from "../game/game";
import AdminPanel from "../admin-panel/admin-panel";

const App = () => {
	return (
		<div className={style.container}>
			
			<Header/>
			
			<div className="wrapper">
				<div className={style.main}>
					<Game/>
					<Options/>
					<AdminPanel />
				</div>
			</div>
		</div>
	);
};

export default App;

