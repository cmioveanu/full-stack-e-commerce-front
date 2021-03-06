import styles from './Account.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Orders } from './Orders';
import { EditDetails } from './EditDetails';


export const Account = () => {
    const [seeOrders, setSeeOrders] = useState(false);
    const [seeEmail, setSeeEmail] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const [message, setMessage] = useState(null);

    const loggedIn = useSelector(state => state.login.loggedIn);


    //see orders
    const openOrders = () => {
        setSeeOrders(true);
        setSeeEmail(false);
        setSeePassword(false);
    }


    //see change email
    const openChangeEmail = () => {
        setSeeEmail(true);
        setSeeOrders(false);
        setSeePassword(false);
    }


    //see change password
    const openChangePassword = () => {
        setSeePassword(true);
        setSeeOrders(false);
        setSeeEmail(false);
    }


    //check for params after redirecting from Stripe checkout
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        const checkParams = async () => {
            //if successful, update to paid and remove parameters
            if (query.get('success')) {
                setMessage('Order placed! You will receive an email confirmation.');

                try {
                    await fetch('api/orders/paid', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                catch (err) {
                    console.error('Unable to update order status to paid', err);
                }

                window.location = '/account';
            }

            //if canceled, delete the order and remove parameters
            if (query.get('canceled')) {
                setMessage('Order canceled! -- continue to shop around and checkout when you\'re ready.');

                try {
                    await fetch('api/orders/delete', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                catch (err) {
                    console.error('Unable to delete the canceled order', err);
                }

                window.location = '/account';
            };
        }

        checkParams();
    }, []);


    return (
        <main className={styles.account}>
            <section className={styles.overview}>
                <h2>
                    {loggedIn ? 'Welcome back!' : 'Please log in first!'}
                </h2>
                <p className={styles.editPara}>You can edit your account details or check out your order history below.</p>

                {!message ? null : <p className={styles.message}>{message}</p>}

                <button onClick={openOrders}>Order history</button>
                <button onClick={openChangeEmail}>Change email</button>
                <button onClick={openChangePassword}>Change password</button>
            </section>

            {  /* Orders */
                seeOrders ? <Orders /> : null
            }

            {  /* Edit Email */
                seeEmail ? <EditDetails type="email" /> : null
            }

            {   /* Edit Password */
                seePassword ? <EditDetails type="password" /> : null
            }

        </main>
    );
}