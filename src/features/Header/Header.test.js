import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../app/store';
import { logIn } from '../Login/LoginSlice';
import { Header } from './Header';


beforeEach(() => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </BrowserRouter>
    );
});


test('renders logo and correct links', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(5);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/about');
    expect(links[2].getAttribute('href')).toBe('/contact');
    expect(links[3].getAttribute('href')).toBe('/login');
    expect(links[4].getAttribute('href')).toBe('/account');
});


test('log out link renders and works correctly after login', () => {
    store.dispatch(logIn());

    const links = screen.getAllByRole('link');
    const logOutLink = links[3];
    expect(logOutLink.textContent).toBe('Log out');

    fireEvent.click(logOutLink);

    const newLinks = screen.getAllByRole('link');
    const loginLink = newLinks[3];
    expect(loginLink.textContent).toBe('Login');
});


test('opens and closes mobile menu', () => {
    const button = screen.getByTestId('openMenuButton');
    fireEvent.click(button);

    //two Account links, the regular one, and the one in the modal
    const accountTexts = screen.getAllByText('Account');
    expect(accountTexts.length).toBe(2);

    const closeButton = screen.getByText('X');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    
    //modal is closed, so the button is unavailable
    expect(screen.queryByText('X')).toBeNull();
});