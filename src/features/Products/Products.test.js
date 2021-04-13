import { render, screen, waitFor } from '@testing-library/react';
import { Products } from './Products';

import { Provider } from 'react-redux';
import store from '../../app/store';


test('renders heading and products', async () => {
    render(
        <Provider store={store}>
            <Products />
        </Provider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();

    const utah = await screen.findByText("The Utah");
    const iadho = await screen.findByText("The Idaho");
    const geneva = await screen.findByText("The Geneva");
    const scandinavia = await screen.findByText("The Scandinavia");

    expect(utah).toBeInTheDocument();
    expect(iadho).toBeInTheDocument();
    expect(geneva).toBeInTheDocument();
    expect(scandinavia).toBeInTheDocument();
});
