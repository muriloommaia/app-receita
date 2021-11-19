import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import InputGen from '../components/InputGen';
import { changeUser } from '../store/userSlice';

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
    <div>
      <div>
        <InputGen
          config={ ['text', 'email', 'email-input', email, false,
            ({ target: { value } }) => setEmail(value), 'Email', 'email-input'] }
        />
        <InputGen
          config={ ['password', 'password', 'password-input', password, false,
            ({ target: { value } }) => setPassword(value), 'Password', 'password-input'] }
        />
        <div>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="login-submit-btn"
            disabled={ verify() }
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
