import { renderHook } from '@testing-library/react';
import { useShuffleCards } from '../useShuffleCard';

const sampleCards = [
  { image: 'img1.jpg' },
  { image: 'img1.jpg' },
  { image: 'img2.jpg' },
  { image: 'img2.jpg' },
  { image: 'img3.jpg' },
  { image: 'img3.jpg' },
  { image: 'img4.jpg' },
  { image: 'img4.jpg' },
  { image: 'img5.jpg' },
  { image: 'img5.jpg' },
];
 
describe('useShuffleCards', () => {
  test('returns a shuffled array of the input cards', () => {
    const { result } = renderHook(() => useShuffleCards(sampleCards));
    
    expect(result.current).toHaveLength(sampleCards.length);
    expect(result.current).toEqual(expect.arrayContaining(sampleCards));
    expect(result.current).not.toEqual(sampleCards); // very likely different order
  });

  test('memoizes result unless cards input changes', () => {
    const { result, rerender } = renderHook(
      ({ cards }) => useShuffleCards(cards),
      { initialProps: { cards: sampleCards } }
    );

    const firstResult = result.current;

    // Re-render with same reference: should not reshuffle
    rerender({ cards: sampleCards });
    expect(result.current).toBe(firstResult);

    // Re-render with new reference: should reshuffle
    const newCards = [...sampleCards]; // shallow copy
    rerender({ cards: newCards });
    expect(result.current).not.toBe(firstResult);
  });

  test('returns consistent length and structure', () => {
    const { result } = renderHook(() => useShuffleCards(sampleCards));
    const shuffled = result.current;

    expect(shuffled).toHaveLength(10);
    shuffled.forEach(card => {
      expect(card).toHaveProperty('image');
    });
  });
});
