import React, { Suspense } from 'react';
import { useState } from 'react';

import styles from './Cart.module.css';

export const Cart = (props) => {
    
    
    

    return (
        <section className={styles.cart} id="cart">
            <p>{props.itemsInCart} item(s) added to your cart</p>
            <div className={styles.productsContainer}>
            {
                props.cart.map(product => (
                    <div key={product.id} className={styles.product}>
                        <div><img src={"/_images/" + product.img_thumb_path}></img></div>

                        <div className={styles.productInfo}>
                            <p className={styles.productName}>{product.name} <br /></p>
                            <p className={styles.productQuantity}>{product.quantity} x £{product.unit_price}</p>

                            <button onClick={() => {
                                props.removeFromTotal(product.unit_price);
                                props.removeFromCart(product);
                            }}>-</button> {product.quantity} <button onClick={() => {
                                props.addToTotal(product.unit_price);
                                props.addToCart(product);
                            }}>+</button>

                            <br />

                            <button onClick={() => props.removeAllFromCart(product)}
                            className={styles.removeButton}>REMOVE</button>

                        </div>
                    </div>
                ))
            }
            </div>
            <div className={styles.checkoutSection}>
                <p>FREE SHIPPING ON ALL U.S. ORDERS</p>
                <p>SUBTOTAL: £{props.total.toFixed(2)}</p>
            </div>
        </section>
    );
}