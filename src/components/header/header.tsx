import React from 'react';
import style from './header.module.scss';
import {VscAccount} from "react-icons/vsc";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.links}>
                    <Link to='/'>
                        <button>
                            Keyboard simulator
                        </button>
                    </Link>
                </div>
                <div className={style.links}>
                    <Link to='/user'>
                        <button className={style.profileButton}>
                            <VscAccount/>
                            <p> My Profile </p>
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Header;