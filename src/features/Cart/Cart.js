import styles from './Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart, removeAllFromCart } from '../Cart/CartSlice';
import { useEffect } from 'react';

import { images } from '../../_images/images';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IiLWaFmwWJ3Dyfc6Tg7PKSoEcaNMTO62LGjrNBCh3YJ34LGDqdaytDx8gCOwe3Czk8HdCMy7MKtCWsl5k54cnwc00CtddBNIs');


export const Cart = (props) => {
    const dispatch = useDispatch();

    const productsInCart = useSelector(state => state.cart.productsInCart);
    const numberOfItems = useSelector(state => state.cart.numberOfItems);
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


    //Stripe checkout
    const handleStripeCheckout = async () => {

        //map the products to the Stripe format
        const products = productsInCart.map(product => {
            return {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: product.name
                    },
                    unit_amount: Math.round(product.unit_price * 100)
                },
                quantity: product.quantity
            }
        });

        //map the product ids and quantities for inserting into database
        const productIds = productsInCart.map(product => {
            return {
                id: product.id,
                quantity: product.quantity
            }
        })

        //create Stripe checkout session and redirect to Stripe
        try {
            const stripe = await stripePromise;

            const response = await fetch('api/checkout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    products: products,
                    productIds: productIds
                })
            });

            const jsonResponse = await response.json();

            await stripe.redirectToCheckout({
                sessionId: jsonResponse.id
            });
        }
        catch (err) {
            console.error(err);
        }
    };


    return (
        <section className={styles.cart}>
            <div className={styles.innerContainer}>

                {/* items in cart count at the top*/}
                <div className={styles.productsInCart}>
                    <p>{numberOfItems} item(s) in your cart</p>
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
                                    <p className={styles.productQuantity}>{product.quantity} x ??{product.unit_price}</p>

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
                    <p>SUBTOTAL: ??{totalCost.toFixed(2)}</p>
                    <button
                        className={styles.checkoutButton}
                        onClick={handleStripeCheckout}
                    >Checkout</button>
                </div>
            </div>
        </section>
    );
}