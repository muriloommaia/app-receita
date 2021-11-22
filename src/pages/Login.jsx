import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import InputGen from '../components/InputGen';
import { changeUser } from '../store/userSlice';
import StyleForm from './templates/StyleForm';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLogged } = useSelector((state) => state.user);

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(changeUser({ email, password }));
  };

  const verify = () => {
    const NUMBER_MIN_PASSWORD = 6;
    const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (re.test(email) && password.length > NUMBER_MIN_PASSWORD) {
      return false;
    }
    return true;
  };

  if (isLogged) return <Redirect to="/comidas" />;
  return (
    <div className="h-screen flex flex-col-reverse justify-center md:flex-row align-middle pb-20">
      <div className="px-12 w-full md:px-8 md:w-1/2 flex items-center justify-around">
        <StyleForm>
          <InputGen
            config={['text', 'email', 'email-input', email, false,
              ({ target: { value } }) => setEmail(value), 'Email', 'border border-gray-500 rounded ml-3']}
          />
          <div class="mt-8">
              <InputGen
                config={['password', 'password', 'password-input', password, false,
                  ({ target: { value } }) => setPassword(value), 'Password', 'border border-gray-500 rounded ml-3']}
              />
          </div>
          <div className="mt-8">
            <button
              type="button"
              onClick={handleClick}
              data-testid="login-submit-btn"
              disabled={verify()}
            >
              Entrar
            </button>
          </div>
        </StyleForm>
      </div>
      <div className="flex flex-col font-sans md:font-serif md:self-center items-center md:w-1/2 mb-5">
        <p className="text-5xl md:text-6xl">App de Receitas</p>
        <div className=" border border-gray-900 w-1/2 mt-4 mb-2" />
        <p className="text-xl md:text-3xl italic">Descubra um novo mundo</p>
      </div>
    </div>
  );
}
