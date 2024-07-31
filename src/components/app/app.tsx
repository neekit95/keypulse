import Header from "../header/header";
import Options from "../options/options";
import Game from "../game/game";
import AdminPanel from "../admin-panel/admin-panel";
import style from './app.module.scss';
import React from "react";

const App: React.FC = () => {
    return (
        <div className={style.container}>

            <Header/>

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

export default App;


