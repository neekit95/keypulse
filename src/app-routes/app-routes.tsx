import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/home-page/home-page";
import NotFountPage from "../pages/not-found-page/not-fount-page";
import UserPage from "../pages/user-page/user-page";
import LearningPage from "../pages/learning-page/learning-page";
import SettingsPage from "../pages/settings-page/settings-page";


const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage/>}/>
			<Route path='/user' element={<UserPage/>}/>
			<Route path='/learning' element={<LearningPage/>}/>
			<Route path='/settings' element={<SettingsPage/>}/>
			<Route path='*' element={<NotFountPage/>}/>
		</Routes>
	);
};

export default AppRoutes;

