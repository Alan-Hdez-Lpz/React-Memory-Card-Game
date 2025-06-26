import React from 'react';
import cardBack from '../assets/cards/card-back.jpg'; 
import '../styles.css';

const Card = React.memo(({ card, onClick, isFlipped, isMatched }) => {
    const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(card); // this must be a function
    }
  };

  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      <img src={isFlipped || isMatched ? card.image : cardBack} alt="card back" />
    </div>
  );
});

export default Card;
