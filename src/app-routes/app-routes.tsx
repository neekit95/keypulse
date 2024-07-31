import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "../pages/home-page";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/' element={<HomePage/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;

