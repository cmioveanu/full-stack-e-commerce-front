import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const [alert, setAlert] = useState("");


    //login and if successful, redirect to workout page
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === passwordConfirm) {
            try {
                const result = await fetch('https://full-stack-e-commerce-backend.herokuapp.com/api/account/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone
                    })
                });

                if (result.status === 403) {
                    setAlert("Email already exists. Please log in.");
                } else if (result.status === 201) {
                    setAlert("User created, you can log in now.");
                }
            }
            catch (err) {
                console.error('Unable to register new account', err);
            }

        } else {
            setAlert("Password fields don't match. Try again.");
        }
    }
    

    return (
        <main className={styles.register}>
            <form onSubmit={handleSubmit} action="">
                <div>
                    <label htmlFor="username">Email:</label>
                    <input id="username" type="email" required
                        onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" required
                        onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="passwordConfirm">Confirm Password:</label>
                    <input id="passwordConfirm" type="password" required
                        onChange={e => setPasswordConfirm(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" type="text" required
                        onChange={e => setFirstName(e.target.value)} />
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" type="text" required
                        onChange={e => setLastName(e.target.value)} />
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input id="phoneNumber" type="tel" required
                        onChange={e => setPhone(e.target.value)} />
                    <button type="submit">Register</button>
                    <p className={styles.alert}>{alert}</p>
                    <p>Already have an account? <Link to="/login">Log in here.</Link></p>
                </div>
            </form>

        </main >
    );
}