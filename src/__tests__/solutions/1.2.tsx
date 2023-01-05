import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/1/Counter';
import { wait } from '../../test/wait';

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const div = document.createElement('div');
    document.body.append(div);

    const root = ReactDOM.createRoot(div);
    root.render(<Counter />);

    await wait(1);

    const buttons = div.querySelectorAll('button');

    const span = div.querySelector('span');
    expect(span?.textContent).toBe('Current count: 0');

    const [minus] = buttons;

    minus.click();
    await wait(1);

    expect(span?.textContent).toBe('Current count: -1');
  });

  test('the counter is incremented when the plus button is clicked', async () => {
    const div = document.createElement('div');
    document.body.append(div);

    const root = ReactDOM.createRoot(div);
    root.render(<Counter />);

    await wait(1);

    const buttons = div.querySelectorAll('button');

    const span = div.querySelector('span');
    expect(span?.textContent).toBe('Current count: 0');

    const [, plus] = buttons;

    plus.click();
    await wait(1);

    expect(span?.textContent).toBe('Current count: 1');
  });
});
