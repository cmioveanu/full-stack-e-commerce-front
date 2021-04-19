import styles from './Contact.module.css';
import { useState } from 'react';


export const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        const sentEmail = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: name,
                email: email,
                message: message
            }
        });

        if(sentEmail.status === 200) {
            setAlert("Message sent. Thank you!");
        } else {
            setAlert("Message was not sent, try again.");
        }
    }


    return (
        <section className={styles.contact}>
            <h2>Contact Us</h2>

            <form onSubmit={handleSubmit} method="POST">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={e => setName(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)} />


                <label htmlFor="message">Message:</label>
                <textarea rows="5" id="message" onChange={e => setMessage(e.target.value)}></textarea>

                <button type="submit">Send</button>
                <p>{alert}</p>
            </form>
        </section>
    );
}