import { faker } from '@faker-js/faker';
import { screen, waitForElementToBeRemoved, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Auth } from '../../components/auth/Auth';
import { setup } from '../../test/setup';

const authFormSetup = async (username?: string) => {
  const { user } = setup(<Auth />);

  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');
  const submit = screen.getByRole('button', { name: 'Login' });

  const form = {
    username: username ?? undefined,
    password: faker.internet.password(),
  };

  await act( async () => {
    form.username && await user.type(usernameInput, form.username);
    await user.type(passwordInput, form.password);
    await user.click(submit);
  });

  return { user, form };
};

const invalidUsername = 'invalid_username';
const invalidCredentialsError = 'Invalid credentials';
const noMessageUsername = 'no_message';

describe('Auth', () => {
  test('user is display after form submission if api send correct data', async () => {

    const username = faker.internet.userName();
    await authFormSetup(username);
    
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    
    // Vérifie que le username est bien affiché dans le document
    expect(screen.getByText(`Logged in as ${username}`)).toBeInTheDocument();
  });

  test('if username is invalid_username, throws a 401 HTTP error with a json containing "Invalid credentials"', async () => {
    await authFormSetup(invalidUsername);
    
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(screen.getByRole('alert')).toHaveTextContent(invalidCredentialsError);
  });

  test('if username is no_message, throws a 401 HTTP error without json and show a default message "An error occured"', async () => {
    await authFormSetup(noMessageUsername);
    
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
    expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
      <p
        role="alert"
      >
        An error occurred
      </p>
    `);
  });
});
