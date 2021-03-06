import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Products } from './Products';
import store from '../../app/store';


beforeEach(() => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Products />
            </Provider>
        </BrowserRouter>
    );
})


test('renders heading and products', async () => {
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


test('renders and closes individual product modal', async () => {
    const name = await screen.findByText('The Utah');
    fireEvent.click(name);

    //expect go back button to be rendered
    const goBack = screen.getByText('<< go back');
    expect(goBack).toBeInTheDocument();

    //click go back and expect it to disappear
    fireEvent.click(goBack);
    const goBackExists = screen.queryByText('<< go back');
    expect(goBackExists).toBeNull();
});