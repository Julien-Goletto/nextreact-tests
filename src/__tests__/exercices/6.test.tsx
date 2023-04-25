import { describe, test, expect } from 'vitest';
import { screen, act } from '@testing-library/react';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { renderApp } from '../../test/renderApp';

describe('Dashboard', () => {
  test('toggle dark mode update the dashboard colors', async () => {
    const { user } = renderApp(<Dashboard />);
    const darkmodeButton = screen.getByRole('button', {
      name: /dark mode/i
    });
    // 🦁 Toggle le dark mode et vérifier que le text à changer
    await act(async() => {
      await user.click(darkmodeButton);
    });
    expect(darkmodeButton).toHaveTextContent(/light mode/i);
  });
});
