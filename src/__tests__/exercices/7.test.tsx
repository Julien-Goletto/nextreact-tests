import { describe, test, expect } from 'vitest';
import { useCounter } from '../../hooks/useCounter';
import { setup } from '../../test/setup';
import { act, screen } from '@testing-library/react';

const TestComponent = () => {
  const { count, decrement, increment, reset, setCount } = useCounter();
  return (
    <>
      <p data-testId='counter'>{count}</p>
      {/* 🦁 Crée des boutons pour nos différentes méthodes */}
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};

describe('useCounter', () => {
  test('show the counter and increment/decrement/reset/set counter', async () => {
    const { user } = setup(<TestComponent />);
    // 🦁 Utilise les boutons qu'on à créer pour interagir avec le hooks
    const [decrementBtn, incrementBtn, resetBtn] = screen.getAllByRole('button');
    const counter = screen.getByTestId('counter');
    
    expect(counter).toHaveTextContent('0');

    await act(async() => {
      await user.click(decrementBtn);
    });
    screen.debug();
    expect(counter).toHaveTextContent('-1');
    
    await act(async () => {
      await user.click(resetBtn);
    });
    expect(counter).toHaveTextContent('0');
    
    await act(async () => {
      await user.click(incrementBtn);
    });
    expect(counter).toHaveTextContent('1');

  });
});
