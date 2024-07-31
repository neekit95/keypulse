import React from 'react';
import {Link} from 'react-router-dom'

const NotFountPage = () => {
    return (
        <div>
            <p>Page not found</p>
            <p>Go to
                <Link to='/'>
                    <button>Home page</button>
                </Link>
            </p>
        </div>
    );
};

export default NotFountPage;

