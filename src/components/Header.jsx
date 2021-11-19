import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';

export default function Header({ searchRender, title }) {
  const [clickSearch, setclickSearch] = useState(false);

  const searchButton = () => (
    <button
      type="button"
      onClick={ () => setclickSearch(!clickSearch) }
      className="bg-transparent border-0"
    >
      <img
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="icone de busca"
      />
    </button>
  );

  return (
    <div>
      <div className="d-flex">
        <div>
          <Link to="/perfil">
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="icone de perfil"
            />
          </Link>
        </div>
        <div>
          <h1 data-testid="page-title">{ title }</h1>
        </div>
        { searchRender
        && searchButton() }
      </div>
      { clickSearch && <HeaderSearch />}
    </div>
  );
}

Header.propTypes = {
  searchRender: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  searchRender: true,
};
