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
      {/* <img
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="icone de busca"
      /> */}
      <i className="fas fa-search text-icons text-3xl"></i>

    </button>
  );

  return (
    <div className="p-2 bg-secondary bg-opacity-80">
      <div className="flex justify-between items-center">
        <div className="">
          <Link to="/perfil">
            {/* <img
              src={ profileIcon }
              className="text-gray-50"
              data-testid="profile-top-btn"
              alt="icone de perfil"
            /> */}
            <i className="far fa-user text-icons text-4xl"></i>
          </Link>
        </div>
        <div className="mx-2 text-icons">
          <h1 data-testid="page-title" className="text-4xl font-bold text-white">{ title }</h1>
        </div>
        <div>
        { searchRender
        && searchButton() }
        </div>
      </div>
      <div className="">
      { clickSearch && <HeaderSearch />}
      </div>
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
