import { fireEvent, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';

import { About } from './About';


beforeEach(() => {
    render(
        <Provider store={store}>
            <About />
        </Provider>
    );
});


test('opens and closes modal', () => {
    const firstHeading = screen.getByText('Why choose The Wooden Shop?');
    expect(firstHeading).toBeInTheDocument();

    const secondHeading = screen.getByText('What about skin allergies?');
    expect(secondHeading).toBeInTheDocument();
});

