import react from 'react';
import styles from './Login.module.css';

export const Login = () => {

    return (
        <section className={styles.login}>
            <div className={styles.forms}>
                <h2>Log In</h2>
                <p>Log in to your Wooden Shop account.</p>
                <form action="/account/login" method="post">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <input className={styles.submitButton} type="submit" value="Log In" />
                </form>
            </div>
            
            <div className={styles.forms}>
                <h2>Sign Up</h2>
                <p> Create a Wooden Shop account for quick checkout.</p>
                <form action="/account/join" method="post">
                    <input type="text" name="firstName" placeholder="First Name" />
                    <input type="text" name="lastName" placeholder="Last Name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="tel" name="phone" placeholder="Phone" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="password" />
                    <input className={styles.submitButton} type="submit" value="Sign Up" />
                </form>
            </div>
        </section>
    );
}