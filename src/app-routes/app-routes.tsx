import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/home-page";
import NotFountPage from "../pages/not-found-page/not-fount-page";
import UserPage from "../pages/user-page/user-page";


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/user' element={<UserPage/>}/>
            <Route path='*' element={<NotFountPage/>}/>
        </Routes>
    );
};

export default AppRoutes;

