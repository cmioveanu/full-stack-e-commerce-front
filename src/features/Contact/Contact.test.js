import { fireEvent, render, screen } from '@testing-library/react';
import { Contact } from './Contact';


beforeEach(() => {
    render(<Contact />);
});


test('renders heading and form', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    const name = screen.getByLabelText('Name:');
    const email = screen.getByLabelText('Email:');
    const message = screen.getByLabelText('Message:');
    const send = screen.getByRole('button');

    expect(heading).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(send).toBeInTheDocument();
});


test('renders error message on fail', async () => {
    const name = screen.getByLabelText('Name:');
    fireEvent.change(name, { target: { value: "James" } });

    const email = screen.getByLabelText('Email:');
    fireEvent.change(email, { target: { value: "cmioveanu@gmail.com" } });

    const message = screen.getByLabelText('Message:');
    fireEvent.change(message, { target: { value: 'Hello world!' } });

    const send = screen.getByText('Send');
    fireEvent.click(send);

    const alert = await screen.findByText('Message was not sent, try again.');
    expect(alert).toBeInTheDocument();
});


test('renders success message on success', async () => {
    const name = screen.getByLabelText('Name:');
    fireEvent.change(name, { target: { value: "Cristian" } });

    const email = screen.getByLabelText('Email:');
    fireEvent.change(email, { target: { value: "cmioveanu@gmail.com" } });

    const message = screen.getByLabelText('Message:');
    fireEvent.change(message, { target: { value: 'Hello world!' } });

    const send = screen.getByText('Send');
    fireEvent.click(send);

    const alert = await screen.findByText('Message sent. Thank you!');
    expect(alert).toBeInTheDocument();
});

