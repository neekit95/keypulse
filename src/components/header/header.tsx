import React from 'react';
import style from './header.module.scss';
import {VscAccount} from "react-icons/vsc";

const Header = () => {
    return (
        <div className={style.container}>
            <div className={style.name}>
                Keyboard simulator
            </div>

            <div className={style.profile}>
                <button className={style.profileButton}>
                    <VscAccount/>
                    <p>
                        My Profile
                    </p>
                </button>

            </div>


        </div>
    )
        ;
};

export default Header;
