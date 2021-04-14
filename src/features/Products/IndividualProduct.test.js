import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IndividualProduct } from './IndividualProduct';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../app/store';

import { products } from '../../mocks/testData';


test('renders product details', async () => {
    const watch = products[2];

    render(
        <BrowserRouter>
            <Provider store={store}>
                <IndividualProduct product={watch}/>
            </Provider>
        </BrowserRouter>
    )

    const movement = await screen.findByText('japanese 2035 majoy quartz');
    expect(movement).toBeInTheDocument();
});