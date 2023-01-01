import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const title = screen.getByText("Excercises");
  const button = screen.getByRole('button', {
    name: /Next/i
  })
  const adjective = screen.getByRole('radio', { name: "adjective" })
  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(adjective).not.toBeChecked();
});

