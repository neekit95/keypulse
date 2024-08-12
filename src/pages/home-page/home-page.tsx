import React from 'react';
import style from "../../components/app/app.module.scss";
// import Header from "../components/header/header";
import Game from "../../components/game/game";
import Options from "../../components/options/options";
import AdminPanel from "../../components/admin-panel/admin-panel";


const HomePage = () => {
	return (
		<div className={style.container}>

			<div className="wrapper">
				<div className={style.main}>
					<Game/>
					<Options/>
					<AdminPanel/>
				</div>
			</div>

		</div>
	);
};

export default HomePage;

