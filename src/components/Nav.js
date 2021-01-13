import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <Link to="/settings">Settings</Link>
            <Link to="/sign-in">Sign in</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
};

export default Nav;
