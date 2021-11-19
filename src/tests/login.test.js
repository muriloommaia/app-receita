import React from 'react';
import { render, fireEvent, screen } from '../test-utils/test-utils';
import App from '../App';
import Login from '../pages/Login';

describe('Criação de elementos na tela', () => {
  test(('Verifica existencia dos inputs e botão'), () => {
    render(<Login />);

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    const buttonLogin = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
    expect(window.location.pathname).toStrictEqual('/');
  });

  test('Botão inicia Desabilitado', () => {
    render(<Login />);

    const { disabled } = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(disabled).toBe(true);
  });
});

describe('Inserção de valores nos inputs para habilitar botão', () => {
  test(('É possível inserir valores nos inputs'), () => {
    render(<Login />);

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    const { disabled } = screen.getByRole('button', {
      name: /entrar/i,
    });

    fireEvent.change(inputEmail, { target: { value: 'teste' } });
    fireEvent.change(inputPassword, { target: { value: '1234' } });

    expect(inputEmail.value).toBe('teste');
    expect(inputPassword.value).toBe('1234');
    expect(disabled).toBe(true);
  });

  test(('Com valores corretos o botão é habilitado'), () => {
    render(<Login />);

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    const buttonLogin = screen.getByRole('button', {
      name: /entrar/i,
    });

    fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });

    expect(buttonLogin.disabled).toBe(false);
  });
});

describe('Com botão habilitado, verifica localStorage e path', () => {
  test(('Ao clicar no botão habilitado, os inputs somem'), () => {
    render(<App />);
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    const buttonLogin = screen.getByRole('button', {
      name: /entrar/i,
    });

    fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    fireEvent.click(buttonLogin);

    expect(window.location.pathname).toStrictEqual('/comidas');
    expect(inputEmail).not.toBeInTheDocument();
    expect(inputPassword).not.toBeInTheDocument();
  });
});
