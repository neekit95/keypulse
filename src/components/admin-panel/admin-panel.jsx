import React from 'react';
import style from './admin-panel.module.scss';
import {useSelector, useDispatch} from "react-redux";


const AdminPanel = () => {
	const currentSymbols = useSelector((state) => state.texts.currentSybols)
	
	return (
		<div className={style.container}>
			<p> Число знаков:  {currentSymbols}</p>
			
		</div>
	);
};

export default AdminPanel;

