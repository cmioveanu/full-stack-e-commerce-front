import React from 'react';
import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';


test('renders Footer component', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
});