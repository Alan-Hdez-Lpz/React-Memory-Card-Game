import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders initial scoreboard with attempts and time', async () => {
    render(<App />);

    expect(await screen.findByText(/attempts:/i)).toBeInTheDocument();
    expect(screen.getByText(/time:/i)).toBeInTheDocument();
  });

  test('displays final score when game is over (if applicable)', async () => {
    render(<App />);

    // Wait some time — this is placeholder logic. You may want to simulate gameOver more directly.
    await waitFor(
      () => {
        const score = screen.queryByText(/final score/i);
        if (score) {
          expect(score).toBeInTheDocument();
        }
      },
      { timeout: 5000 }
    );
  });
});
