export const useScore = (attempts, time) => {
  return 10000 - (attempts * 100 + time * 10); // Example scoring logic
};
