export const initialState = {
  cards: [],
  firstCard: null,
  secondCard: null,
  disabled: false,
  attempts: 0,
  matchedPairs: 0,
  gameOver: false,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        ...state,
        cards: action.payload,
        attempts: 0,
        matchedPairs: 0,
        firstCard: null,
        secondCard: null,
        disabled: false,
        gameOver: false,
      };

    case 'SELECT_CARD':
      if (!state.firstCard) {
        return { ...state, firstCard: action.payload };
      } else if (!state.secondCard) {
        return {
          ...state,
          secondCard: action.payload,
          disabled: true,
        };
      }
      return state;

    case 'CHECK_MATCH':
      const { firstCard, secondCard, cards } = state;
      if (!firstCard || !secondCard) return state;

      let updatedCards = [...cards];
      let matchedPairs = state.matchedPairs;

      if (firstCard.image === secondCard.image) {
        updatedCards = updatedCards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, matched: true }
            : card
        );
        matchedPairs += 1;
      }

      return {
        ...state,
        cards: updatedCards,
        firstCard: null,
        secondCard: null,
        attempts: state.attempts + 1,
        matchedPairs,
        disabled: false,
        gameOver: matchedPairs === updatedCards.length / 2,
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        cards: action.payload, // reshuffled new cards
      };
      
    default:
      return state;
  }
};
