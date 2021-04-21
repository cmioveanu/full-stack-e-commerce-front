import styles from './Orders.module.css';
import { useState, useEffect } from 'react';

import { images } from '../../_images/images';
import { dateConverter } from '../../utils/helpers';


export const Orders = () => {
    const [orders, setOrders] = useState([]);


    //get the list of previous orders
    useEffect(() => {
        const ordersList = async () => {
            try {
                const orders = await fetch('/api/orders');
                const jsonOrders = await orders.json();
                setOrders(jsonOrders);
            }
            catch (err) {
                console.error('Unable to fetch orders', err);
            }
        }

        ordersList();
    }, [])


    return (
        <section className={styles.ordersHistory}>
            {
                /* Map the list of orders for display */
                orders.map(order => (
                    <div key={order[0].order_id + order[0].product_id} className={styles.individualOrder}>

                        <div className={styles.orderDetails}>
                            <p className={styles.orderId}># {order[0].order_id} - {order[0].status}</p>
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
    );
};