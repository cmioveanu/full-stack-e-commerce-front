import styles from './Header.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

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
        try {
            fetch('api/account/logout');
            dispatch(logOut());

        }
        catch (err) {
            console.error('Unable to log out', err);
        }

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
                        <Link
                            to="/"
                            scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
                        >The Wooden Shop</Link>
                    </h1>
                    <ul >
                        <li><Link
                            smooth to="/products"
                        >Products</Link></li>
                        <li><Link
                            smooth to="/about"
                        >About</Link></li>
                        <li><Link
                            smooth to="/contact"
                        >Contact</Link></li>
                    </ul>
                </div>

                <ul>
                    {
                        !loggedIn ? <li><Link to="/login">Login</Link></li> :
                            <li><Link to="/login" onClick={handleLogoutClick}>Log out</Link></li>
                    }

                    {
                        !loggedIn ? null :
                            <li><Link to="/account">Account</Link></li>
                    }

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
            {!menuOpen ? null :
                <nav className={styles.mobileNav}>
                    <div className={styles.mobileNavInner}>
                        <button onClick={() => setMenuOpen(false)}>X</button>

                        <div className={styles.linksContainer}>
                            <ul>
                                <li><Link
                                    smooth to="/#products"
                                    onClick={closeMenu}
                                >Products</Link></li>
                                <li><Link
                                    smooth to="/#about"
                                    onClick={closeMenu}
                                >About</Link></li>
                                <li><Link
                                    smooth to="/#contact"
                                    onClick={closeMenu}
                                >Contact</Link></li>
                                {
                                    !loggedIn ? <li><Link to="/login" onClick={closeMenu}>Login</Link></li> :
                                        <li><Link to="/login" onClick={handleLogoutClick}>Log out</Link></li>
                                }
                                {
                                    !loggedIn ? null :
                                        <li><Link to="/account" onClick={closeMenu}>Account</Link></li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            }

            {/* Cart Component */}
            {showCart ? <Cart toggleCart={toggleCart} /> : null}
        </header>
    );
};