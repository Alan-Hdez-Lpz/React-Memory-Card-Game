import { useContext, useEffect, useCallback, lazy, Suspense} from 'react';
import { GameContext } from '../context/GameContext';

const Card = lazy(() => import('./Card'));

const GameBoard = () => {
  const {
    cards,
    firstCard,
    secondCard,
    dispatch,
    disabled
  } = useContext(GameContext);

  const handleCardClick = useCallback(
    (card) => {
      if (disabled || card === firstCard || card.matched) return;
      dispatch({ type: 'SELECT_CARD', payload: card });
    },
    [disabled, firstCard, dispatch]
  );

  // Effect to check match when two cards are selected
  useEffect(() => {
    if (firstCard && secondCard) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 1000); // delay before flipping back

      return () => clearTimeout(timeout);
    }
  }, [firstCard, secondCard, dispatch]);

  return (
    <div className="game-board">
        <Suspense fallback={<p>Loading cards...</p>}>
        {cards.map((card) => {
        const isFlipped = card === firstCard || card === secondCard || card.matched;

        return (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            isFlipped={isFlipped}
            isMatched={card.matched}
          />
        );
      })}
      </Suspense>
    </div>
  );
};

export default GameBoard;
