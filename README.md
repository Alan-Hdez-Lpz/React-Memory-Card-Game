# React-Memory-Card-Game
Project: Build a Memory Card Game with React

Project description:
- This is a memory card matching game built with React. Players flip over pairs of cards trying to find matches within the shortest time and least number of attempts. The game features a dynamic game board, scoring system, timer, and responsive design.
- The project uses React Context API and `useReducer` for global state management, custom hooks for game logic, lazy loading with `React.lazy` and `Suspense`, and includes error boundaries for robust error handling.

Features
- Dynamic Game Board: Cards are shuffled and displayed in a grid layout.
- Card Interaction: Flip cards, check for matches, and handle unmatched pairs.
- Global State Management: Uses Context API and `useReducer` to manage game state.
- Timer & Scoreboard: Tracks time and attempts, calculates and displays score.
- Restart Functionality: "Play Again" button reshuffles cards and restarts the game.
- Performance Optimizations: Utilizes `React.memo`, `useCallback`, and `useMemo`.
- Custom Hooks: Includes hooks like `useShuffleCards` and `useTimer` for clean logic.
- Error Handling: Implements error boundaries with fallback UI.
- Responsive Design: Adapts layout for various screen sizes.
- Accessibility: Focus management using `useRef` for keyboard navigation.

How to Run the Project

1. Clone the Repository
2. cd memory-card-game
3. Start the Development Server (npm start)
4. If the browser does not open automatically, open it and visit: http://localhost:3000
