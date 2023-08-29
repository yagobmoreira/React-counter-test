import { screen } from '@testing-library/react';
import renderWithRedux from './utils/renderWithRedux';
import userEvent from '@testing-library/user-event';

import App from './App';

test('A página deve renderizar dois botões e o número "0"', () => {
  renderWithRedux(<App />);
  const buttonAdicionar = screen.queryAllByRole('button');
  expect(buttonAdicionar.length).toBe(2);
  expect(screen.getByText('0')).toBeInTheDocument();
});

test('O número renderizado na página deve ser o mesmo valor do estado global', () => {
  const state = {
    counterReducer: {
      count: 10,
    },
  };
  renderWithRedux(<App />, state);

  expect(screen.queryByText('0')).not.toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
});

test('Teste com o valor padrão do reducer e testar se o clique dos botões incrementa corretamente o valor do estado global.', async () => {
  const { user, store } = renderWithRedux(<App />);
  const btnAdd1 = screen.getByRole('button', { name: 'Incrementa 1' });
  const btnAdd5 = screen.getByRole('button', { name: 'Incrementa 5' });
  expect(screen.getByText('0')).toBeInTheDocument();
  expect(store.getState().counterReducer.count).toBe(0);

  await user.click(btnAdd1);
  await user.click(btnAdd1);
  await user.click(btnAdd5);

  expect(screen.getByText('7')).toBeInTheDocument();
  expect(store.getState().counterReducer.count).toBe(7);
});

test('Alterar o valor inicial do estado global count para 5 e testar se os botões incrementam corretamente o valor do estado global.', async () => {
  const state = {
    counterReducer: {
      count: 5,
    },
  };
  const { user, store } = renderWithRedux(<App />, state);

  const btnAdd1 = screen.getByRole('button', { name: 'Incrementa 1' });
  const btnAdd5 = screen.getByRole('button', { name: 'Incrementa 5' });
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(store.getState().counterReducer.count).toBe(5);

  await user.click(btnAdd1);
  await user.click(btnAdd1);
  await user.click(btnAdd5);

  expect(screen.getByText('12')).toBeInTheDocument();
  expect(store.getState().counterReducer.count).toBe(12);
});
