import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from '../Scoreboard';

describe('Scoreboard', () => {
  test('shows attempts, matched pairs, and time when game is not over', () => {
    render(
      <Scoreboard
        attempts={3}
        matchedPairs={2}
        time={10}
        gameOver={false}
        score={null}
        onRestart={jest.fn()}
      />
    );

    expect(screen.getByText(/attempts: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/matched pairs: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/time: 10s/i)).toBeInTheDocument();

    // Final score and button should NOT be in the document yet
    expect(screen.queryByText(/game over/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /play again/i })).not.toBeInTheDocument();
  });

  test('shows final score and Play Again button when game is over', () => {
    const onRestartMock = jest.fn();

    render(
      <Scoreboard
        attempts={5}
        matchedPairs={6}
        time={42}
        gameOver={true}
        score={850}
        onRestart={onRestartMock}
      />
    );

    expect(screen.getByText(/🎉 game over!/i)).toBeInTheDocument();
    expect(screen.getByText(/finished in 42 seconds/i)).toBeInTheDocument();
    expect(screen.getByText(/total attempts: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/your score:/i)).toBeInTheDocument();
    expect(screen.getByText('850')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /play again/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onRestartMock).toHaveBeenCalledTimes(1);
  });

  test('focuses the restart button when game is over', () => {
    render(
      <Scoreboard
        attempts={5}
        matchedPairs={6}
        time={42}
        gameOver={true}
        score={850}
        onRestart={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /play again/i });
    expect(document.activeElement).toBe(button);
  });
});
