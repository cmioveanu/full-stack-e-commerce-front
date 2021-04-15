import styles from './Account.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Orders } from './Orders';
import { EditDetails } from './EditDetails';


export const Account = () => {
    const [seeOrders, setSeeOrders] = useState(false);
    const [seeEmail, setSeeEmail] = useState(false);
    const [seePassword, setSeePassword] = useState(false);

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


    return (
        <section className={styles.account}>
            <section className={styles.overview}>
                <h2>
                    {loggedIn ? 'Welcome back!' : 'Please log in first!'}
                </h2>
                <p className={styles.editPara}>You can edit your account details or check out your order history below.</p>

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

        </section>
    );
}