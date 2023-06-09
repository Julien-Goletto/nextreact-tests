import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

export type UseCounterOutput = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
};

export const useCounter = (initialValue?: number): UseCounterOutput => {
  const [count, setCount] = useState(initialValue ?? 0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue ?? 0);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
};
