import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Account } from './Account';

import { Provider } from 'react-redux';
import store from '../../app/store';


beforeEach(() => {
    render(
        <Provider store={store}>
            <Account />
        </Provider>
    );
});


test('renders buttons', () => {
    const history = screen.getByText('Order history');
    const email = screen.getByText('Change email');
    const password = screen.getByText('Change password');

    expect(history).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
});


test('renders order history', async () => {
    const history = screen.getByText('Order history');
    fireEvent.click(history);

    const idOne = await screen.findByText('# 28');
    const idTwo = await screen.findByText('# 27');
    const totalOne = await screen.findByText('Total: £699.92');
    const totalTwo = await screen.findByText('Total: £279.97');
    const geneva = await screen.findAllByText('The Geneva');
    const scandinavia = await screen.findAllByText('The Scandinavia');

    expect(idOne).toBeInTheDocument();
    expect(idTwo).toBeInTheDocument();
    expect(totalOne).toBeInTheDocument();
    expect(totalTwo).toBeInTheDocument();
    expect(geneva.length).toBe(2);
    expect(scandinavia.length).toBe(2);
});


test('renders email change form', () => {
    const email = screen.getByText('Change email');
    fireEvent.click(email);

    const newEmail = screen.getByText('New email address:');
    const emailConfirm = screen.getByText('Confirm new email address:');

    expect(newEmail).toBeInTheDocument();
    expect(emailConfirm).toBeInTheDocument();
});


test('renders password change form', () => {
    const password = screen.getByText('Change password');
    fireEvent.click(password);

    const newPassword = screen.getByText('New password:');
    const passwordConfirm = screen.getByText('Confirm new password:');

    expect(newPassword).toBeInTheDocument();
    expect(passwordConfirm).toBeInTheDocument();
});