import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GameWrapper from '../GameWrapper';
import { GameContext } from '../../context/GameContext';

// Mock GameBoard since it's lazy-loaded
jest.mock('../GameBoard', () => () => <div data-testid="gameboard">Game Board</div>);

// Sample mock cards
const mockCards = [
  { id: 1, image: 'img1.jpg' },
  { id: 2, image: 'img2.jpg' },
];

const baseCards = [...mockCards, ...mockCards];

const renderWithContext = (contextValue) => {
  return render(
    <GameContext.Provider value={contextValue}>
      <GameWrapper />
    </GameContext.Provider>
  );
};

describe('GameWrapper', () => {
  test('renders loading fallback and then game board', async () => {
    const contextValue = {
      attempts: 0,
      matchedPairs: 0,
      gameOver: false,
      dispatch: jest.fn(),
      cards: [],
      baseCards,
    };

    renderWithContext(contextValue);

    expect(screen.getByText(/loading game board/i)).toBeInTheDocument();

    const board = await screen.findByTestId('gameboard');
    expect(board).toBeInTheDocument();
  });

  test('renders scoreboard with initial values', async () => {
    const contextValue = {
      attempts: 3,
      matchedPairs: 2,
      gameOver: false,
      dispatch: jest.fn(),
      cards: baseCards,
      baseCards,
    };

    renderWithContext(contextValue);

    await screen.findByTestId('gameboard');

    expect(screen.getByText(/attempts: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/matched pairs: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/time:/i)).toBeInTheDocument();
  });

  test('displays final score and handles restart on gameOver', async () => {
    const mockDispatch = jest.fn();
    const contextValue = {
      attempts: 5,
      matchedPairs: 6,
      cards: [],
      baseCards,
      gameOver: true,
      dispatch: mockDispatch,
    };

    renderWithContext(contextValue);

    expect(await screen.findByText(/game over/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /play again/i }));

    // The button triggers a state update to reshuffle — actual dispatch is in a useEffect
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'RESET_GAME',
      }));
    });
  });
});
