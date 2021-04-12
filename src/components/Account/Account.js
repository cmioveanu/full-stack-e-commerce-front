import React from 'react';
import styles from './Account.module.css';
import { useState, useEffect } from 'react';



export const Account = (props) => {
    const [orders, setOrders] = useState([]);

    const ordersList = async () => {
        const orders = await fetch('http://localhost:8080/orders', {
            credentials: 'include'
        });

        const jsonOrders = await orders.json();
        await props.setName(jsonOrders[0][0].firstName + " " + jsonOrders[0][0].lastName);
        console.log("name is: " + props.name);

        setOrders(jsonOrders);

    }

    useEffect(() => {
        ordersList();
    }, [])

    const loggedInOrOut = props.name ? `Welcome back, ${props.name}! Your previous orders:` : `Please log in first!`;

    const renderOrders = !props.name ? null : orders.map(order => (
            <div key={order[0].id} className={styles.individualOrder}>
                <div className={styles.orderDetails}>
                    <p>{(order[0].created_at)}</p>
                    <p>Order # {order[0].order_id} </p>
                    <p>Order total: £{order[0].totalOrderAmount}</p>
                </div>
                {
                    order.map(product => (
                        <div className={styles.productDetails} >
                            <img src={"/_images/" + product.img_thumb_path} />
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
    


    return (
        <section className={styles.account}>
            <div className={styles.ordersContainer}>
                <h2>{loggedInOrOut}</h2>
                <div className={styles.ordersHistory}>
                    {renderOrders}
                </div>
            </div>
        </section>
    );
}