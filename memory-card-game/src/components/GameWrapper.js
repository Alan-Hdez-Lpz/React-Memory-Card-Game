import React, { Suspense, useContext, useEffect, useState, useMemo } from 'react';
import Scoreboard from './Scoreboard';
import { GameContext } from '../context/GameContext';
import { useShuffleCards } from '../hooks/useShuffleCard';
import useTimer from '../hooks/useTimer';
import Layout from './Layout';

const GameBoard = React.lazy(() => import('./GameBoard'));

const GameWrapper = () => {
  const { attempts, matchedPairs, cards, gameOver, dispatch, baseCards } = useContext(GameContext);

  const gameStarted = cards.length > 0 && !gameOver;
  const { seconds, reset } = useTimer(gameStarted);

  const [finalTime, setFinalTime] = useState(null);

  //Local state to trigger reshuffling
  const [cardsToShuffle, setCardsToShuffle] = useState(baseCards);

  //Get shuffled cards using the hook
  const shuffledCards = useShuffleCards(cardsToShuffle);

  useEffect(() => {
    if (!gameStarted) {
      reset();
    }
    // ⏱ Capture final time the moment game ends
    if (gameOver && finalTime === null) {
      setFinalTime(seconds);
    }
  }, [gameOver, gameStarted, seconds, finalTime, reset]);

  // 🎯 Dispatch RESET_GAME when shuffledCards change
  useEffect(() => {
    setFinalTime(null);
    dispatch({ type: 'RESET_GAME', payload: shuffledCards });
  }, [shuffledCards, dispatch]);

  
  // ✅ Calculate score when game is over
const score = useMemo(() => {
    if (!gameOver || finalTime === null) return null;
    return Math.max(1000 - (attempts * 10 + finalTime * 2), 0);
  }, [gameOver, attempts, finalTime]);

  const displayTime = gameOver ? finalTime : seconds;

  // ✅ Restart handler
  const handleRestartGame = () => {
    setCardsToShuffle([...baseCards]); // new ref = reshuffle
  };

  return (
    <Layout>
      <div className="info-panel">
        <Scoreboard attempts={attempts} time={displayTime} gameOver={gameOver} score={score} matchedPairs={matchedPairs} onRestart={handleRestartGame}/>
      </div>
      <Suspense fallback={<p>Loading game board...</p>}>
        <GameBoard />
      </Suspense>
    </Layout>
  );
};

export default GameWrapper;
