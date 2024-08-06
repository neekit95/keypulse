import React from 'react';
import style from './header.module.scss';
import {VscAccount} from "react-icons/vsc";
import {Link} from 'react-router-dom';

const Header = () => {
    console.log('Rendering Header component');
    return (
        <div className={style.container}>
            <div className={style.name}>
                <Link to='/'>
                    <button>
                        Keyboard simulator
                    </button>
                </Link>
            </div>
            <div className={style.profile}>
                <Link to='/user'>
                    <button className={style.profileButton}>
                        <VscAccount/>
                        <p> My Profile </p>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;