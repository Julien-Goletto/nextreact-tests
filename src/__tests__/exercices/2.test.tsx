import { describe, test, expect, vi } from 'vitest';
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

  test('the counter is rendered with a custom default value if specified', async () => {
    const defaultValue = 3644;
    setup(<Counter defaultValue={defaultValue}/>);
    screen.getByText(String(defaultValue));
  });

  test('onChange Fn is called and passed with correct values', async () => {
    const onChangeMock = vi.fn();
    const { user } = setup(<Counter onChange={onChangeMock}/>);
    const [plus, minus] = screen.getAllByRole("button");
    await user.click(minus);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(-1);
    
    await user.click(plus);
    expect(onChangeMock).toHaveBeenNthCalledWith(2, 0);
  });
});
