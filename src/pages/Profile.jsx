import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { changeUser } from '../store/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const className = 'border-2 w-60 mx-2 p-2 mt-3 border-primary rounded-md hover:text-gray-50 hover:bg-primary transition duration-300 ease-in-out transform  focus:bg-primary focus:text-gray-50 md:w-72'
  return (
    <div className="h-screen">
      <div>
        <Header searchRender={false} title="Perfil" />
      </div>
      <section className="mt-4">
        <div className="flex flex-col justify-center items-center h-96">
        <h3 data-testid="profile-email"
          className="text-center my-3 text-3xl italic"
        >
          {localStorage.getItem('user')
            && JSON.parse(localStorage.getItem('user')).email}

        </h3>
          <Link to="/receitas-feitas">
            <button
              type="button"
              // onClick={ handleClick }
              className={className}
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              type="button"
              className={className}
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>

          <Link to="/">
            <button
              type="button"
              onClick={() => {
                localStorage.clear()
                dispatch(changeUser({isLogged: false}))
                }}
              className={`${className} border-red-700 hover:bg-red-700`}
              data-testid="profile-logout-btn"
            >
              Sair
            </button>
          </Link>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}
