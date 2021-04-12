import styles from './Header.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { logOut } from '../Login/LoginSlice';

export const Header = (props) => {
    const loggedIn = useSelector(state => state.login.loggedIn);
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);


    //log out and redirect to login page
    const handleLogoutClick = () => {
        fetch('api/account/logout');
        dispatch(logOut());
        setMenuOpen(false);
    }


    const closeMenu = () => {
        setMenuOpen(false);
    }


    return (
        <header>
            <nav className={styles.mainNav}>
                <div>
                    <h1 className={styles.logo}><Link to="/">The Wooden Shop</Link></h1>
                    <ul >
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <ul>
                    {
                        !loggedIn ? <li><Link to="/login">Login</Link></li> :
                            <li><Link to="/login" onClick={handleLogoutClick}>Log out</Link></li>
                    }
                    <li><Link to="/account">Account</Link></li>
                    <li onClick={props.showHideCart}><span className={styles.cart}>Cart: {props.itemsInCart}</span></li>
                </ul>

                {/* Hamburger menu icon */}
                <ul className={styles.cartAndMobileMenu}>
                    <li onClick={props.showHideCart}><span className={styles.cart}>Cart: {props.itemsInCart}</span></li>
                    <li>
                        <svg
                            viewBox="0 0 100 80"
                            width="40"
                            height="40"
                            data-testid="openMenuButton"
                            onClick={() => setMenuOpen(true)}
                        >
                            <rect width="100" height="10"></rect>
                            <rect y="30" width="100" height="10"></rect>
                            <rect y="60" width="100" height="10"></rect>
                        </svg>
                    </li>
                </ul>
            </nav>

            {/* Mobile nav, only displayed for smaller devices */}
            {   !menuOpen ? null :
                <nav className={styles.mobileNav}>
                    <div className={styles.mobileNavInner}>
                        <button onClick={() => setMenuOpen(false)}>X</button>

                        <div className={styles.linksContainer}>
                            <ul>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                {
                                    !loggedIn ? <li><Link to="/login" onClick={closeMenu}>Login</Link></li> :
                                        <li><Link to="/login" onClick={handleLogoutClick}>Log out</Link></li>
                                }
                                <li><Link to="/account" onClick={closeMenu}>Account</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            }
        </header>
    );
};