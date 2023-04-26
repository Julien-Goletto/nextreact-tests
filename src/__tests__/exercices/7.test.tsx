import { describe, test, expect } from 'vitest';
import type { UseCounterOutput} from '../../hooks/useCounter';
import { useCounter } from '../../hooks/useCounter';
import { setup } from '../../test/setup';
import { act, render, screen } from '@testing-library/react';

const TestComponent = () => {
  const { count, decrement, increment, reset, setCount } = useCounter();
  return (
    <>
      <p data-testid='counter'>{count}</p>
      {/* 🦁 Crée des boutons pour nos différentes méthodes */}
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCount(10)}>Set to 10</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};

const setupCounter = (initialValue?: number) => {
  const hook = {} as {
    current: UseCounterOutput;
  };

  const TestComponentBis = () => {
    hook.current = useCounter(initialValue);
    return null;
  };
  render(<TestComponentBis />);
  return hook;
};

describe('useCounter', () => {
  test('show the counter and increment/decrement/reset/set counter', async () => {
    const { user } = setup(<TestComponent />);
    // 🦁 Utilise les boutons qu'on à créer pour interagir avec le hooks
    const [decrementBtn, incrementBtn, setTo10Btn, resetBtn] = screen.getAllByRole('button');
    const counter = screen.getByTestId('counter');

    expect(counter).toHaveTextContent('0');

    await act(async() => {
      await user.click(decrementBtn);
    });
    expect(counter).toHaveTextContent('-1');
    
    await act(async () => {
      await user.click(incrementBtn);
    });
    expect(counter).toHaveTextContent('0');
    
    await act(async () => {
      await user.click(setTo10Btn);
    });
    expect(counter).toHaveTextContent('10');

    await act(async () => {
      await user.click(resetBtn);
    });
    expect(counter).toHaveTextContent('0');
  });

  test('show the counter and increment/decrement/reset/set counter', async () => {
    const counter = setupCounter();

    await act(async() => {
      counter.current.decrement();
    });
    expect(counter.current.count).toBe(-1);

    await act(async() => {
      counter.current.increment();
    });
    expect(counter.current.count).toBe(0);
    
    await act(async() => {
      counter.current.setCount(10);
    });
    expect(counter.current.count).toBe(10);

    await act(async() => {
      counter.current.reset();
    });
    expect(counter.current.count).toBe(0);
  });

  test('show the counter and increment/decrement/reset/set counter', async () => {
    const initialValue = 100;

    const counter = setupCounter(initialValue);

    expect(counter.current.count).toBe(100);

  });
});
