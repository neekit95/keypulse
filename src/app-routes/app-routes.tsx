import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "../pages/home-page";
import NotFountPage from "../pages/not-found-page/not-fount-page";
import UserPage from "../pages/user-page";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/user' element={<UserPage/>}/>
                <Route path='*' element={<NotFountPage/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;

