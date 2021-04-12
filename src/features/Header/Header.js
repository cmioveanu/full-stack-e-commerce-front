import React from 'react';
import styles from './Header.module.css';

import { Link } from "react-router-dom";

export const Header = (props) => {

    const logMeOut = async () => {
        await fetch('api/account/logout');
    }

    const loginLogout = props.name ? <li onClick={logMeOut}><Link to="">Log Out</Link></li>
        : <li><Link to="/login">Log In</Link></li>;



    return (
        <header>
            <nav className={styles.mainNav}>
                <div>
                    <h1 className={styles.logo}><Link to="/">The Wooden Shop</Link></h1>
                    <ul>
                        <li><Link to="/"></Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <ul>
                    {loginLogout}
                    <li><Link to="/account">Account</Link></li>
                    <li onClick={props.showHideCart}><span className={styles.cart}>Cart: {props.itemsInCart}</span></li>
                </ul>
            </nav>
        </header>
    );
};