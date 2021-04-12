import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Bestsellers } from './Bestsellers';

test('renders Bestsellers component', () => {
    render(<Bestsellers />);

    const bestsellersContainer = document.querySelector('.bestsellers');
    expect(bestsellersContainer).toBeInTheDocument();
});

test('renders components correctly', async () => {
    render(<Bestsellers productsListUrl="/products"/>);

    expect(await screen.findByText("The Utah")).toBeInTheDocument();
    screen.debug();

});
