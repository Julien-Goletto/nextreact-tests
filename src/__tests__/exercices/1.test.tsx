// 🦁 Ajoute `expect` à l'import de `vitest`
import { describe, test, expect } from 'vitest';
// 🦁 Dé-commente les imports suivants
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { Counter } from '../../components/counter/Counter';
import { wait } from '../../test/wait';

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    // 🦁 Créer un élément `div` avec `document.createElement`
    const div = document.createElement('div');
    // 🦁 Ajouter l'élément `div` au `body` avec `document.body.append`
    document.body.append(div);
    // ---
    // 🦁 Il faut wrapper la suite dans un `act` comme expliqué dans les instructions
    // 🦁 Créer un `root` avec `ReactDOM.createRoot`
    // 🦁 Rendre le composant `Counter` dans le `root`
    await act(() => {
      const root = ReactDOM.createRoot(div);
      root.render(<Counter />);
    });
    // --
    // 🦁 Récupère le bouton "minus"
    const buttons = [...document.querySelectorAll('button')];
    const minusButton = buttons.find((b) => (b.textContent === '-'));
    // 🦁 Utilise `expect` pour vérifier que le contenue du span est "0"
    const counterNumber = document.querySelector('span');
    expect(counterNumber?.textContent).toBe('0');
    // --
    // 🦁 Il faut wrapper l'appel du clique dans un `act`
    await act(async () => {
      // 🦁 Clique sur le bouton "moins"
      minusButton?.click();
      // 🦁 Attendre 1ms
      // setTimeout(() => {
      //   return;
      // }, 1000);
      await wait(1);
    });
    // 🦁 Vérifie que le contenue du span est "-1"
    expect(counterNumber?.textContent).toBe('-1');
  });
});
