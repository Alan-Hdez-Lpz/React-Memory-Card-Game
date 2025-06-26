import { useMemo } from 'react';
import shuffle from '../utils/shuffle';

export const useShuffleCards = (cards) => {
  return useMemo(() => shuffle(cards), [cards]);
};
