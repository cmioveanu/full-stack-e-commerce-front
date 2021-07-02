import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Banner } from './Banner';


test('renders headings', () => {
    render(
        <BrowserRouter>
            <Banner />
        </BrowserRouter>
    );

    const big = screen.getByText('Stylish. Elegant. Unique.');
    const small = screen.getByText('Beautiful eco-friendly accesories');
    expect(big).toBeInTheDocument();
    expect(small).toBeInTheDocument();
});