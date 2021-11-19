import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <div>
        <Header searchRender={ false } title="Perfil" />
      </div>
      <section>
        <h3 data-testid="profile-email">
          { localStorage.getItem('user')
      && JSON.parse(localStorage.getItem('user')).email}

        </h3>
        <Link to="/receitas-feitas">
          <button
            type="button"
            // onClick={ handleClick }
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            onClick={ () => localStorage.clear() }
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </Link>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}
