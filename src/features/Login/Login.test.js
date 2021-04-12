import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { logOut } from './LoginSlice';

import { Login } from './Login';
import { Header } from '../Header/Header';


test('logs in if username and password valid', async () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header />
                <Login />
            </Provider>
        </BrowserRouter>
    );

    //if log out link is not displayed, user is not logged in
    const logOutLink = screen.queryByText('Log out');
    expect(logOutLink).toBeNull();

    //log in
    const username = screen.getByLabelText('Email:');
    const password = screen.getByLabelText('Password:');
    const login = screen.getByRole('button');

    fireEvent.change(username, { target: { value: 'TestUser' } });
    fireEvent.change(password, { target: { value: 'TestPassword' } });
    fireEvent.click(login);

    //expecting log out link to be displayed, because user is now logged in
    const newLogOut = await screen.findByText('Log out');
    expect(newLogOut).toBeInTheDocument();

    //log back out after testing
    store.dispatch(logOut());
});


test('links correctly to Register page', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Login />
            </Provider>
        </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/register');
});
