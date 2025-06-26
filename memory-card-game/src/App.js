import { GameProvider } from './context/GameContext';
import GameWrapper from './components/GameWrapper';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <GameProvider>
      <ErrorBoundary>
        <GameWrapper />
      </ErrorBoundary>
    </GameProvider>
  );
};

export default App;
