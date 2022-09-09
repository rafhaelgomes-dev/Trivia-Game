import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Login from '../../Pages/Login';
import App from '../../App';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

describe('Test login page', () => {
  test("Verifica se os inputs estão na página home '/'", () => {
    const pathHome = '/';
    renderWithRouterAndRedux(
      <Login />,
      { initialEntries: [pathHome] },
    );

    const email = screen.getByTestId("input-gravatar-email");
    expect(email).toBeInTheDocument();

    const name = screen.getByTestId("input-player-name");
    expect(name).toBeInTheDocument();

    const buttonPlay = screen.getByTestId("btn-play");
    expect(buttonPlay).toBeInTheDocument();

  })

  test('Verifica se o botão play está desabilitado ou habilitado', () => {
    const pathHome = '/';
    renderWithRouterAndRedux(
      <Login />,
      { initialEntries: [pathHome] },
    );

    const buttonPlay = screen.getByTestId("btn-play");
    expect(buttonPlay).toBeDisabled();
    
    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");

    const emailInvalid = 'testeemail';
    const nameInvalid = 'Ali'
    userEvent.type(email, emailInvalid);
    userEvent.type(name, nameInvalid);
    expect(buttonPlay).toBeDisabled();
    
    const emailValid = 'testeemail@gmail.com';
    const nameValid = 'Alice'
    userEvent.type(email, emailValid);
    userEvent.type(name, nameValid);
    expect(buttonPlay).toBeEnabled();
  })

  test("Verifica se ao clicar no botão play redireciona para a rota '/game'", async () => {
    const pathHome = '/';
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathHome] },
    );

    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    const emailValid = 'testeemail@gmail.com';
    const nameValid = 'Alice';
    userEvent.type(email, emailValid);
    userEvent.type(name, nameValid);

    const buttonPlay = screen.getByTestId("btn-play");
    userEvent.click(buttonPlay);
    await (waitFor(() => expect(buttonPlay).not.toBeInTheDocument(), {timeout:3000}));
    expect(history.location.pathname).toBe('/game');
  })

  test("Verifica se ao clicar no botão config redireciona para a rota '/config'", () => {
    const pathHome = '/';
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathHome] },
    );
    
    const buttonConfig = screen.getByTestId("btn-settings");
    expect(buttonConfig).toBeInTheDocument();
    userEvent.click(buttonConfig);
    expect(history.location.pathname).toEqual('/config');
  })

  test('Verifica se ao clicar no botão play o estado global é atualizado', () => {
    const { store } = renderWithRouterAndRedux(
      <Login />,
      { initialState: INITIAL_STATE },
    );
  
    const buttonPlay = screen.getByTestId("btn-play");
    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    const emailValid = 'testeemail@gmail.com';
    const nameValid = 'Alice';
    userEvent.type(email, emailValid);
    userEvent.type(name, nameValid);
    userEvent.click(buttonPlay);
  
    expect(store.getState().user.name).toEqual(nameValid); 
    expect(store.getState().user.email).toEqual(emailValid); 
  });
})


