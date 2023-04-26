import { describe, test, expect } from 'vitest';
import type { UseCounterOutput} from '../../hooks/useCounter';
import { useCounter } from '../../hooks/useCounter';
import { setup } from '../../test/setup';
import { act, render, screen } from '@testing-library/react';

const TestComponent = () => {
  const { count, decrement, increment, reset, setCount } = useCounter();
  return (
    <>
      <p data-testId='counter'>{count}</p>
      {/* 🦁 Crée des boutons pour nos différentes méthodes */}
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCount(10)}>Set to 10</button>
      <button onClick={reset}>Reset</button>
    </>
  );
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
    let counter: UseCounterOutput = null as unknown as UseCounterOutput;

    const TestComponentBis = () => {
      counter = useCounter();
      return null;
    };

    render(<TestComponentBis />);

    await act(async() => {
      counter.decrement();
    });
    expect(counter.count).toBe(-1);

    await act(async() => {
      counter.increment();
    });
    expect(counter.count).toBe(0);
    
    await act(async() => {
      counter.setCount(10);
    });
    expect(counter.count).toBe(10);

    await act(async() => {
      counter.reset();
    });
    expect(counter.count).toBe(0);
  });
});
