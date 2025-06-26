import { gameReducer, initialState } from '../gameReducer';

test('resets game with new cards', () => {
  const newCards = [{ id: '1', image: 'img.jpg' }];
  const state = gameReducer(initialState, { type: 'RESET_GAME', payload: newCards });

  expect(state.cards).toEqual(newCards);
  expect(state.attempts).toBe(0);
  expect(state.firstCard).toBeNull();
  expect(state.gameOver).toBe(false);
});
