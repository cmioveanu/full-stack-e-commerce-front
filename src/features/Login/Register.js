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
    const handleSubmit = (event) => {
        event.preventDefault();

        if (password === passwordConfirm) {
            fetch('api/account/register', {
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
            }).then(res => {
                if (res.status === 403) {
                    setAlert("Email already exists. Please log in.");
                } else if (res.status === 201) {
                    setAlert("User created, you can log in now.");
                }
            });

        } else {
            setAlert("Password fields don't match. Try again.");
        }
    }

    return (
        <section className={styles.registerContainer}>
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

        </section >
    );
}