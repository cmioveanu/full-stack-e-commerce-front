import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';


test('renders Header component', () => {
    render(<Header />, { wrapper: MemoryRouter });

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
});

test('log in link available when logged out', () => {
    render(<Header name=""/>, { wrapper: MemoryRouter });

    const logInLink = screen.getByText('Log In');
    expect(logInLink).toBeInTheDocument();
});

test('logout link available when logged in', () => {
    render(<Header name="Cristian"/>, { wrapper: MemoryRouter });

    const logOutLink = screen.getByText('Log Out');
    expect(logOutLink).toBeInTheDocument();
});
