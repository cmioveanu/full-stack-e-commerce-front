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


test('renders heading and description', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    const description = screen.getByText(`The Wooden Shop is where you can choose high quality, hand crafted timepieces from some of the top bamboo and wood watches brands in the world.`);

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
});


test('opens and closes modal', () => {
    const readMore = screen.getByText('Read more');
    expect(readMore).toBeInTheDocument();

    fireEvent.click(readMore);

    const goBackButtons = screen.getAllByText('<< go back');
    expect(goBackButtons.length).toBe(2);

    const firstHeading = screen.getByText('Why choose The Wooden Shop?');
    expect(firstHeading).toBeInTheDocument();

    const secondHeading = screen.getByText('What about skin allergies?');
    expect(secondHeading).toBeInTheDocument();
});

