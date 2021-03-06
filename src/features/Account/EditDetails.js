import { useState } from 'react';
import styles from './EditDetails.module.css';


export const EditDetails = (props) => {
    const [newEmail, setNewEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [alertMessage, setAlertMessage] = useState("");


    //change email
    const handleEmailSubmit = async (event) => {
        event.preventDefault();

        if (newEmail === emailConfirm) {
            try {
                const result = await fetch('api/account/email', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: oldPassword,
                        newEmail: newEmail
                    })
                });

                if (result.status === 200) {
                    setAlertMessage('Email changed.');
                }
                else if (result.status === 403) {
                    setAlertMessage('Unable to change email. Please try again!');
                }
            }
            catch (err) {
                console.error('Unable to change email', err);
            }
        }
        else {
            setAlertMessage("Emails don't match. Try again!");
        }
    }


    //change password
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        if (newPassword === passwordConfirm) {
            try {
                const result = await fetch('api/account/password', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    })
                });

                if (result.status === 200) {
                    setAlertMessage('Password changed.');
                }
                else if (result.status === 403) {
                    setAlertMessage('Unable to change password. Please try again!');
                }
            }
            catch (err) {
                console.error('Unable to change password', err);
            }
        }
        else {
            setAlertMessage("Passwords don't match. Try again!");
        }
    }


    return (
        <section className={styles.editDetailsContainer}>

            {/* If the type is email, render email form. Otherwise render password form */}
            { props.type === 'email' ?
                <form onSubmit={handleEmailSubmit} action="">
                    <label htmlFor="passwordConfirmEmail">Enter your password:</label>
                    <input id="passwordConfirmEmail" type="password" required
                        onChange={e => setOldPassword(e.target.value)} />
                    <label htmlFor="newEmail">New email address:</label>
                    <input id="newEmail" type="email" required
                        onChange={e => setNewEmail(e.target.value)} />
                    <label htmlFor="emailConfirm">Confirm new email address:</label>
                    <input id="emailConfirm" type="email" required
                        onChange={e => setEmailConfirm(e.target.value)} />
                    <button type="submit">Change email address</button>
                </form>
                :
                <form onSubmit={handlePasswordSubmit} action="">
                    <label htmlFor="oldPassword">Enter old password:</label>
                    <input id="oldPassword" type="password" required
                        onChange={e => setOldPassword(e.target.value)} />
                    <label htmlFor="newPassword">New password:</label>
                    <input id="newPassword" type="password" required
                        onChange={e => setNewPassword(e.target.value)} />
                    <label htmlFor="passwordConfirm">Confirm new password:</label>
                    <input id="passwordConfirm" type="password" required
                        onChange={e => setPasswordConfirm(e.target.value)} />
                    <button type="submit">Change password</button>
                </form>
            }
            <p className={styles.alert}>{alertMessage}</p>
        </section >
    );
}