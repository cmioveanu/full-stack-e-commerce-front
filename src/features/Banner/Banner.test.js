import React from 'react';
import { render, screen } from '@testing-library/react';

import { Banner } from './Banner';


test('renders headings', () => {
    render(<Banner />);

    const big = screen.getByText('Stylish. Elegant. Unique.');
    const small = screen.getByText('Beautiful eco-friendly accesories');
    expect(big).toBeInTheDocument();
    expect(small).toBeInTheDocument();
});