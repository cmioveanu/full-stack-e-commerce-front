import styles from './Contact.module.css';
import { useState } from 'react';


export const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const sentEmail = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });


            if (sentEmail.status === 200) {
                setAlert("Message sent. Thank you!");
            } else {
                setAlert("Message was not sent, try again.");
            }
        }
        catch (err) {
            console.error('Unable to send email message', err);
        }
    }


    return (
        <main className={styles.contact}>
            <h2>Contact Us</h2>
            <p>Send us a message and we'll get back to you within 24h.</p>

            <form onSubmit={handleSubmit} method="POST">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    rows="5"
                    id="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required>
                </textarea>

                <button type="submit">Send</button>
                <p>{alert}</p>
            </form>
        </main>
    );
}