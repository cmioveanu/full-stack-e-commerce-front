import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Here at <span>The Wooden </span> we simply love wood for its traditional and stylish appearance,
                so we try our best to offer you the highest quality watches and sunglasses.</p>
            <small>&#169; 2021 - The Wooden Shop</small>
        </footer>
    );
};