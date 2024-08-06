import React from 'react';
import style from './header.module.scss';
import {VscAccount} from "react-icons/vsc";
import {BsKeyboard} from "react-icons/bs";
import {Link} from 'react-router-dom';


const Header = () => {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.links}>
                    <Link to='/'>
                        <button>
                            <BsKeyboard className={style.icon}/>
                            KeyPulse
                        </button>
                    </Link>
                </div>
                <div className={style.links}>
                    <Link to='/user'>
                        <button>
                            <VscAccount className={style.icon}/>
                            My Profile
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Header;