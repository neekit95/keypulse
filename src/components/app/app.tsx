import React, {useEffect, useState} from "react";
import AppRoutes from "../../app-routes/app-routes";
import style from './app.module.scss';
import Header from "../header/header";

const App: React.FC = () => {
	const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1100)

	useEffect(() => {
		const handleResize = () => {
			setIsWideScreen(window.innerWidth > 1100);
		}

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, []);

	return (
		<>
			{isWideScreen ? (
				<div className={style.container}>
					<Header/>
					<AppRoutes/>
				</div>
			) : (
				<div className={style.warning}>
					<h2>
						Приложение доступно только на версии desktop
					</h2>
				</div>
			)}

		</>

	);
};

export default App;


