import React from "react";
import AppRoutes from "../../app-routes/app-routes";
import style from './app.module.scss';
import Header from "../header/header";

const App = () => {
    return (
        <div className={style.container}>
            <Header/>
            <AppRoutes/>
        </div>
    );
};

export default App;


