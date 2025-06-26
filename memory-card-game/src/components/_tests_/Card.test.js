import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

const mockCard = {
  id: '1',
  image: '/test/front-image.jpg',
};

describe('Card component', () => {
  test('renders card back when not flipped or matched', () => {
    render(
      <Card
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        onClick={() => {}}
      />
    );

    const img = screen.getByAltText(/card back/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringMatching(/card-back/));
  });

  test('renders card front when flipped', () => {
    render(
      <Card
        card={mockCard}
        isFlipped={true}
        isMatched={false}
        onClick={() => {}}
      />
    );

    const img = screen.getByAltText(/card back/i);
    expect(img).toHaveAttribute('src', mockCard.image);
  });

  test('renders card front when matched', () => {
    render(
      <Card
        card={mockCard}
        isFlipped={false}
        isMatched={true}
        onClick={() => {}}
      />
    );

    const img = screen.getByAltText(/card back/i);
    expect(img).toHaveAttribute('src', mockCard.image);
  });

  test('calls onClick if not flipped or matched', () => {
    const handleClick = jest.fn();

    render(
      <Card
        card={mockCard}
        isFlipped={false}
        isMatched={false}
        onClick={handleClick}
      />
    );

    const cardDiv = screen.getByRole('img').parentElement;
    fireEvent.click(cardDiv);
    expect(handleClick).toHaveBeenCalledWith(mockCard);
  });

  test('does NOT call onClick if already flipped', () => {
    const handleClick = jest.fn();

    render(
      <Card
        card={mockCard}
        isFlipped={true}
        isMatched={false}
        onClick={handleClick}
      />
    );

    const cardDiv = screen.getByRole('img').parentElement;
    fireEvent.click(cardDiv);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('does NOT call onClick if already matched', () => {
    const handleClick = jest.fn();

    render(
      <Card
        card={mockCard}
        isFlipped={false}
        isMatched={true}
        onClick={handleClick}
      />
    );

    const cardDiv = screen.getByRole('img').parentElement;
    fireEvent.click(cardDiv);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
