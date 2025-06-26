import { useEffect, useState } from 'react';

const useTimer = (isActive) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const reset = () => setSeconds(0);

  return { seconds, reset };
};

export default useTimer;
