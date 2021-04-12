import React from 'react';
import styles from './Account.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';



export const Account = () => {
    const [orders, setOrders] = useState([]);
    const loggedIn = useSelector(state => state.login.loggedIn);


    //get the list of previous orders
    useEffect(() => {
        const ordersList = async () => {
            const orders = await fetch('/api/orders');
            const jsonOrders = await orders.json();

            setOrders(jsonOrders);
        }

        ordersList();
    }, [])


    return (
        <section className={styles.account}>
            <div className={styles.ordersContainer}>
                <h2>
                    {loggedIn ? `Welcome back! Your previous orders:` :
                        `Please log in first!`}
                </h2>

                <div className={styles.ordersHistory}>
                    {
                        /* Map the list of orders for display */
                        orders.map(order => (
                            <div key={order[0].id} className={styles.individualOrder}>
                                <div className={styles.orderDetails}>
                                    <p>{(order[0].created_at)}</p>
                                    <p>Order # {order[0].order_id} </p>
                                    <p>Order total: £{order[0].totalOrderAmount}</p>
                                </div>
                                {
                                    order.map(product => (
                                        <div className={styles.productDetails} >
                                            <img src={"/_images/" + product.img_thumb_path} alt={product.name}/>
                                            <div>
                                                <p className={styles.productName}>{product.name}</p>
                                                <p>£{product.unit_price}</p>
                                                <p>Qty: {product.quantity}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}