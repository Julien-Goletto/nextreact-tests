// 🦁 Ajoute `expect` à l'import de `vitest`
import { describe, test, expect } from 'vitest';
// 🦁 Dé-commente les imports suivants
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { Counter } from '../../components/counter/Counter';
import { wait } from '../../test/wait';
import type{ ReactNode } from 'react';

const render = async(component: ReactNode) => {
    const div = document.createElement('div');
    document.body.append(div);
    act(() => {
      const root = ReactDOM.createRoot(div);
      root.render(component);
    });
    return div;
};

const click = async(element: HTMLElement) => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });

  await act(async() => {
    element.dispatchEvent(event);
    await wait(1);
  });
};

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const counter = await render(<Counter />);
    const buttons = [...document.querySelectorAll('button')];
    const [, minus] = buttons;
    const counterNumber = document.querySelector('span');
    expect(counterNumber?.textContent).toBe('0');
    await click(minus);
    expect(counterNumber?.textContent).toBe('-1');
    counter.remove();
  });

  test('the counter is incremented when the plus button is clicked', async () => {
    const counter = await render(<Counter />);
    const buttons = [...document.querySelectorAll('button')];
    const [plus, ] = buttons;
    const counterNumber = document.querySelector('span');
    await click(plus);
    expect(counterNumber?.textContent).toBe('1');
    counter.remove();
  });

  test('the counter is rendered with a custom default value if specified', async () => {
    const defaultValue = 3644;
    const counter = await render(<Counter defaultValue={defaultValue}/>);
    const counterNumber = document.querySelector('span');
    expect(counterNumber?.textContent).toBe(String(defaultValue));
    counter.remove();
  });
});
