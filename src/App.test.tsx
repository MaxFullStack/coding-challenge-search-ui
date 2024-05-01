import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /Search/i });
  expect(buttonElement).toBeInTheDocument();
});

test('renders search button correctly', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /Search/i });
  expect(buttonElement).toBeInTheDocument();
});

test('renders search form correctly', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Enter search term.../i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
});

test('triggers search on button click', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Enter search term.../i) as HTMLInputElement;
  userEvent.type(input, 'test query');
  fireEvent.click(screen.getByRole('button', { name: /Search/i }));
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
});

test('fetches data on search', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve([]),  
  } as Response);

  render(<App />);
  const input = screen.getByPlaceholderText(/Enter search term.../i);
  userEvent.type(input, 'test');
  fireEvent.click(screen.getByRole('button', { name: /Search/i }));

  expect(fetchMock).toHaveBeenCalled();
  fetchMock.mockRestore();
});
