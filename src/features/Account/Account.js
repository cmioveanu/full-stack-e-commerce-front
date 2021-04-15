import styles from './Account.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { images } from '../../_images/images';
import { dateConverter } from '../../utils/helpers';

import { Orders } from './Orders';


export const Account = () => {

    const [seeOrders, setSeeOrders] = useState(false);
    const [seeEmail, setSeeEmail] = useState(false);
    const [seePassword, setSeePassword] = useState(false);

    const loggedIn = useSelector(state => state.login.loggedIn);





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
                !seeOrders ? null : <Orders />
            }

        </section>
    );
}