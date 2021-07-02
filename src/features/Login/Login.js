import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.css';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { logIn } from './LoginSlice';


export const Login = () => {
    const loggedIn = useSelector(state => state.login.loggedIn);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    if (loggedIn) {
        return <Redirect to="/account" />;
    }


    //login and if successful, redirect to main page
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await fetch('https://full-stack-e-commerce-backend.herokuapp.com/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (result.status === 200) {
                dispatch(logIn());
                history.push('/');
            }
        }
        catch (err) {
            console.error('Unable to log in', err);
        }

    }


    return (
        <main className={styles.login}>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="username">Email:</label>
                <input type="email" name="username" id="username" required
                    onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" required
                    onChange={e => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
                <p>Don't have an account? <Link to="/register">Register here.</Link></p>
            </form>
        </main >
    );
}