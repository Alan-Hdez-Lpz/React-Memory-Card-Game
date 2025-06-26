import { createContext, useReducer, useMemo } from 'react';
import { gameReducer, initialState } from './gameReducer';
import { useShuffleCards } from '../hooks/useShuffleCard';
import cardImages from '../components/cardImages';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Prepare your cards array outside of hooks (static or from assets)
  // Create the full card list only once
  const baseCards = useMemo(() => {
    return cardImages.flatMap((img) => [
      { id: `${img.id}-1`, image: img.url, matched: false },
      { id: `${img.id}-2`, image: img.url, matched: false },
    ]);
  }, []);

  // Call useShuffleCards at top-level:
  const shuffledCards = useShuffleCards(baseCards);

  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    cards: shuffledCards,
  });

  // No need to dispatch SET_CARDS here because we initialize state with shuffled cards

  return (
    <GameContext.Provider value={{ ...state, dispatch, baseCards }}>
      {children}
    </GameContext.Provider>
  );
};
