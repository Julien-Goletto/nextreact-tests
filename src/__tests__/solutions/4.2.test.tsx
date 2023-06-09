import { faker } from '@faker-js/faker';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';
import { Auth } from '../../components/auth/Auth';
import { server } from '../../test/server';
import { setup } from '../../test/setup';
import { wait } from '../../test/wait';

const authFormSetup = async (username: string) => {
  const { user } = setup(<Auth />);

  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');

  const form = {
    username,
    password: faker.internet.password(),
  };

  await user.type(usernameInput, form.username);
  await user.type(passwordInput, form.password);

  const submit = screen.getByRole('button', { name: 'Login' });

  await act(async () => user.click(submit));

  return { user, form };
};

const invalidDataMessage = 'Invalid data';

describe('Auth', () => {
  beforeEach(() => {
    server.use(
      rest.post('https://api.server.com/auth/login', async (req, res, ctx) => {
        const body = await req.json();

        await wait(5);

        if (!body.username || !body.password) {
          return res(ctx.json({ message: invalidDataMessage }), ctx.status(400));
        }

        if (body.username === 'invalid_username') {
          return res(
            ctx.status(400),
            ctx.json({
              message: invalidDataMessage,
            })
          );
        }

        return res(
          ctx.json({
            username: body.username,
            email: faker.internet.email(),
            id: faker.datatype.number(),
          })
        );
      })
    );
  });

  test('user is display after form submission if api send correct data', async () => {
    const username = faker.internet.userName('John', 'Doe');

    await authFormSetup(username);

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    expect(screen.getByText(`Logged in as ${username}`)).toBeInTheDocument();
  });

  test('if the user is invalid, a user is displayed', async () => {
    await authFormSetup('invalid_username');

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(invalidDataMessage);
  });
});
