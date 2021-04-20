import styles from './Header.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

import { logOut } from '../Login/LoginSlice';
import { Cart } from '../Cart/Cart';


export const Header = () => {
    const loggedIn = useSelector(state => state.login.loggedIn);
    const numberOfItems = useSelector(state => state.cart.numberOfItems);
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);


    //log out and redirect to login page
    const handleLogoutClick = () => {
        fetch('api/account/logout');
        dispatch(logOut());
        setMenuOpen(false);
    }


    //close mobile menu
    const closeMenu = () => {
        setMenuOpen(false);
    }


    //toggle cart
    const toggleCart = () => {
        showCart ? setShowCart(false) : setShowCart(true);
    }


    return (
        <header>
            {/* Desktop menu */}
            <nav className={styles.mainNav}>
                <div>
                    <h1 className={styles.logo}>
                        <HashLink
                            to="/#"
                            scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
                        >The Wooden Shop</HashLink>
                    </h1>
                    <ul >
                        <li><HashLink
                            smooth to="/#products"
                        >Products</HashLink></li>
                        <li><HashLink
                            smooth to="/#about"
                        >About</HashLink></li>
                        <li><HashLink
                            smooth to="/#contact"
                        >Contact</HashLink></li>
                    </ul>
                </div>

                <ul>
                    {
                        !loggedIn ? <li><Link to="/login">Login</Link></li> :
                            <li><Link to="/login" onClick={handleLogoutClick}>Log out</Link></li>
                    }
                    <li><Link to="/account">Account</Link></li>
                    <li onClick={toggleCart}><span className={styles.cart}>Cart: {numberOfItems}</span></li>
                </ul>

                {/* Hamburger menu icon and cart button */}
                <ul className={styles.cartAndMobileMenu}>
                    <li onClick={toggleCart}><span className={styles.cart}>Cart: {numberOfItems}</span></li>
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
                                <li><HashLink
                                    smooth to="/#products"
                                    onClick={closeMenu}
                                >Products</HashLink></li>
                                <li><HashLink
                                    smooth to="/#about"
                                    onClick={closeMenu}
                                >About</HashLink></li>
                                <li><HashLink
                                    smooth to="/#contact"
                                    onClick={closeMenu}
                                >Contact</HashLink></li>
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

            {/* Cart Component */}
            { showCart ? <Cart toggleCart={toggleCart} /> : null}
        </header>
    );
};