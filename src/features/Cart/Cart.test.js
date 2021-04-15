import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../app/store';

import { Cart } from './Cart';
import { addToCart } from './CartSlice';

import { products } from '../../mocks/testData';


beforeEach(() => {
    render(
        <Provider store={store}>
            <Cart />
        </Provider>
    );
});


test('adds product to cart and its cost to subtotal', () => {
    store.dispatch(addToCart(products[0]));

    const utah = screen.getByText('The Utah');
    const price = screen.getByText('1 x £49.99');
    const subtotal = screen.getByText('SUBTOTAL: £49.99');
    const quantity = screen.getByText('1 item(s) in your cart');

    expect(utah).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(subtotal).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
});


test('increments and decrements product quantity and subtotal', () => {
    const increment = screen.getByText('+');
    const decrement = screen.getByText('-');

    fireEvent.click(increment);
    fireEvent.click(increment);

    //1 item added in previous test, 2 items added in this test
    const quantity = screen.getByText('3 item(s) in your cart');
    const subtotal = screen.getByText('SUBTOTAL: £149.97');
    expect(quantity).toBeInTheDocument();
    expect(subtotal).toBeInTheDocument();

    //remove 1 from item quantity
    fireEvent.click(decrement);
    const newQuantity = screen.getByText('2 item(s) in your cart');
    expect(newQuantity).toBeInTheDocument();
});


test('removes a product entirely and removes its total cost', () => {
    //remove the remaining 2 items
    const removeButton = screen.getByText('REMOVE');
    fireEvent.click(removeButton);

    //expect the item to not be in the cart, expect subtotal to be 0
    const utah = screen.queryByText('The Utah');
    const subtotal = screen.getByText('SUBTOTAL: £0.00');
    expect(utah).toBeNull();
    expect(subtotal).toBeInTheDocument();
});