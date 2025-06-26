import { useEffect, useRef } from 'react';

const Scoreboard = ({ attempts, time, gameOver, matchedPairs, score, onRestart }) => {
  const restartButtonRef = useRef(null);

  useEffect(() => {
    if (gameOver && restartButtonRef.current) {
      restartButtonRef.current.focus();
    }
  }, [gameOver]);

  return (
    <div className="scoreboard">
        {!gameOver && (
        <div>
          <p>Attempts: {attempts}</p>
          <p>Matched pairs: {matchedPairs}</p>
          <p>Time: {time}s</p>
        </div>
      )}

      {gameOver && (
        <div className="final-score">
          <hr />
          <p>🎉 Game Over!</p>
          <p>Finished in {time} seconds</p>
          <p>Total Attempts: {attempts}</p>
          <p>Your Score: <strong>{score}</strong></p>
          <button ref={restartButtonRef} onClick={onRestart}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
