import styles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart, removeAllFromCart } from '../Cart/CartSlice';
import { useEffect } from 'react';

import { images } from '../../_images/images';


export const Cart = (props) => {
    const dispatch = useDispatch();

    const productsInCart = useSelector(state => state.cart.productsInCart);
    const totalCost = useSelector(state => state.cart.totalCost);
    const open = useSelector(state => state.products.individualProductOpen);


    //disable background scroll if cart open and individual product modal is not open
    useEffect(() => {
        if (!open) {
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = '14px';

            return () => {
                document.body.style.overflow = 'unset';
                document.body.style.marginRight = 'unset';
            }
        }
    });


    return (
        <section className={styles.cart}>
                <div className={styles.innerContainer}>

                    {/* items in cart count at the top*/}
                    <div className={styles.productsInCart}>
                        <p>{productsInCart.length} item(s) in your cart</p>
                        <button onClick={props.toggleCart}>X</button>
                    </div>

                    {/* products in cart */}
                    <div className={styles.productsContainer}>
                        {
                            productsInCart.map(product => (
                                <div key={product.id} className={styles.product}>
                                    <div><img src={images[`white${product.id}`]} alt={product.name}></img></div>

                                    <div className={styles.productInfo}>
                                        <p className={styles.productName}>{product.name} <br /></p>
                                        <p className={styles.productQuantity}>{product.quantity} x £{product.unit_price}</p>

                                        <button
                                            className={styles.decrement}
                                            onClick={() => dispatch(removeFromCart(product))}
                                        >-</button>
                                        {product.quantity}
                                        <button
                                            className={styles.increment}
                                            onClick={() => dispatch(addToCart(product))}
                                        >+</button>

                                        <button onClick={() => dispatch(removeAllFromCart(product))}
                                            className={styles.removeButton}>REMOVE</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* subtotal and checkout */}
                    <div className={styles.checkoutSection}>
                        <p>FREE SHIPPING ON ALL U.S. ORDERS</p>
                        <p>SUBTOTAL: £{totalCost.toFixed(2)}</p>
                        <button className={styles.checkoutButton}>Go to checkout</button>
                    </div>
                </div>
        </section>
    );
}