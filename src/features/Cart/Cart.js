import styles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart, removeAllFromCart } from '../Cart/CartSlice';


export const Cart = (props) => {
    const dispatch = useDispatch();

    const productsInCart = useSelector(state => state.cart.productsInCart);
    const totalCost = useSelector(state => state.cart.totalCost);


    return (
        <section className={styles.cart}>
            <div className={styles.innerContainer}>
                <div className={styles.productsInCart}>
                    <p>{productsInCart.length} item(s) in your cart</p>
                    <button onClick={props.toggleCart}>X</button>
                </div>

                <div className={styles.productsContainer}>
                    {
                        productsInCart.map(product => (
                            <div key={product.id} className={styles.product}>
                                <div><img src={"/_images/" + product.img_thumb_path} alt={product.name}></img></div>

                                <div className={styles.productInfo}>
                                    <p className={styles.productName}>{product.name} <br /></p>
                                    <p className={styles.productQuantity}>{product.quantity} x £{product.unit_price}</p>

                                    <button onClick={() => dispatch(removeFromCart(product))}>-</button>
                                    {product.quantity}
                                    <button onClick={() => dispatch(addToCart(product))}>+</button>

                                    <br />

                                    <button onClick={() => dispatch(removeAllFromCart(product))}
                                        className={styles.removeButton}>REMOVE</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.checkoutSection}>
                    <p>FREE SHIPPING ON ALL U.S. ORDERS</p>
                    <p>SUBTOTAL: £{totalCost.toFixed(2)}</p>
                </div>
            </div>
        </section>
    );
}