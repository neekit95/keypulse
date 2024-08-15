import React from 'react';
import style from './not-found-page.module.scss'
import {Link} from 'react-router-dom'

const NotFountPage: React.FC = () => {
    return (
        <div className={style.container}>
            <h1>
                <span>Error</span>
                Page not found
            </h1>
            <div className={style.nav}>
                <Link to='/'>
                    <button>Home page</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFountPage;

