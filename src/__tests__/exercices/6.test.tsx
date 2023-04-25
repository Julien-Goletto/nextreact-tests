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

describe('DashboardHeader and DashboardUser', () => {
  test('By default, no user is logged in' , async () => {
    renderApp(<Dashboard />, { test: 'test'});
    expect(screen.getAllByText(/please login/i)[0]).toBeInTheDocument();
  });

  test('Swith from please login to a welcome message' , async () => {
    const username = 'Jean';
    const { user } = renderApp(<Dashboard />, { test: 'test'});

    const userHeader = screen.getAllByText(/please login/i)[0];
    const input = screen.getByRole('textbox', {
      name: /username/i
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i
    });

    // 🦁 Toggle le dark mode et vérifier que le text à changer
    await act(async() => {
      await user.type(input, username);
      await user.click(loginButton);
    });

    expect(userHeader).toHaveTextContent(/welcome/i);
  });

  test('When a user is logged, login button turns into a logout' , async () => {
    const username = 'Jean';
    const { user } = renderApp(<Dashboard />, { test: 'test'});

    const input = screen.getByRole('textbox', {
      name: /username/i
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i
    });

    await act(async() => {
      await user.type(input, username);
      await user.click(loginButton);
    });
    
    expect(screen.getByRole('button', {
      name: /logout/i
    })).toBeInTheDocument;
  });
});
