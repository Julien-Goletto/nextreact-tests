import { describe, test, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { Counter } from '../../components/counter/Counter';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

const setup = (jsx: ReactElement) => (
  {
    user: userEvent.setup(),
    ...render(jsx),
  }
);

describe('Counter', () => {
  test('the buttons minus and plus are functionnal when clicked', async () => {
    const { user } = setup(<Counter />);
    // 🦁 Récupérer le span qui contient le nombre avec screen.getByText
    const numberCounter = screen.getByText("0");
    // // 🦁 Récupère le bouton plus avec `screen.getByRole`
    const [plus, minus] = screen.getAllByRole("button");
    // 🦁 Clique sur le bouton "plus"
    await user.click(plus);
    // 🦁 Vérifie que le contenue du span est "1"
    expect(numberCounter.textContent).toBe("1");
    // 🦁 Clique sur le bouton "minus"
    await user.click(minus);
    // 🦁 Vérifie que le contenue du span est "0"
    expect(numberCounter.textContent).toBe("0");
  });
});
