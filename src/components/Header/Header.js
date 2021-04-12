import React from 'react';
import styles from './Header.module.css';

import { Link } from "react-router-dom";

export const Header = (props) => {

    const logMeOut = async () => {
        await fetch('http://localhost:8080/account/logout', {
            credentials: 'include'
        });
        props.setName("");
    }

    const loginLogout = props.name ? <li onClick={logMeOut}><Link to="">Log Out</Link></li>
        : <li><Link to="/login">Log In</Link></li>;



    return (
        <header>
            <nav className={styles.mainNav}>
                <ul>
                    <li><Link to="/" className={styles.logo}><span>The Wooden Shop</span></Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                <ul>
                    {loginLogout}
                    <li><Link to="/account">Account</Link></li>
                    <li onClick={props.showHideCart}><span className={styles.cart}>Cart: {props.itemsInCart}</span></li>
                </ul>
            </nav>
        </header>
    );
};