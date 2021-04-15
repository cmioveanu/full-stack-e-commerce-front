import React from 'react';
import styles from './Account.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { images } from '../../_images/images';
import { dateConverter } from '../../utils/helpers';


export const Account = () => {
    const [orders, setOrders] = useState([]);
    const [seeOrders, setSeeOrders] = useState(false);
    const [seeEmail, setSeeEmail] = useState(false);
    const [seePassword, setSeePassword] = useState(false);

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


    //see orders
    const openOrders = () => {
        setSeeEmail(false);
        setSeePassword(false);
        setSeeOrders(true);
    }


    //see change email
    const seeChangeEmail = () => {

    }


    //see change password
    const seeChangePassword = () => {

    }


    return (
        <section className={styles.account}>
            <section className={styles.overview}>
                <h2>
                    {loggedIn ? `Welcome back!` :
                        `Please log in first!`}
                </h2>
                <p className={styles.editPara}>You can edit your account details or check out your order history below.</p>

                <button onClick={openOrders}>Order history</button>
                <button>Change email</button>
                <button>Change password</button>
            </section>


            {  /* Orders Section */
                !seeOrders ? null :
                    <section className={styles.ordersHistory}>
                        {
                            /* Map the list of orders for display */
                            orders.map(order => (
                                <div key={order[0].order_id + order[0].product_id} className={styles.individualOrder}>

                                    <div className={styles.orderDetails}>
                                        <p className={styles.orderId}># {order[0].order_id} </p>
                                        <p>{dateConverter((order[0].created_at))}</p>
                                        <p>Total: £{order[0].totalOrderAmount}</p>
                                    </div>

                                    {
                                        /* Map the products inside the order */
                                        order.map(product => (
                                            <div key={product.product_id + 'product'} className={styles.productDetails} >
                                                <img src={images[`img${product.product_id}`]} alt={product.name} />
                                                <div>
                                                    <p className={styles.productName}>{product.name}</p>
                                                    <p>{product.quantity} x £{product.unit_price}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </section>
            }
        </section>
    );
}