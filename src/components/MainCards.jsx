import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import '../styles/MainCard.css';

export default function MainCards() {
  const data = useSelector((state) => state.data.data);
  const selectedCategory = useSelector((state) => state.search.category.search);
  const history = useHistory();
  const MAX_SHOW_RECIPES = 12;

  if (!data) return <p>loading</p>;

  const value = Object.values(data)[0];
  const path = window.location.pathname.split('/')[1];
  let ref = null;

  if (path === 'comidas') {
    ref = { strTitle: 'strMeal', strThumb: 'strMealThumb', strId: 'idMeal' };
  } else {
    ref = { strTitle: 'strDrink', strThumb: 'strDrinkThumb', strId: 'idDrink' };
  }

  if (!value) {
    return global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    value.length === 1 && !selectedCategory
      ? <Redirect push to={ `/${path}/${value[0][ref.strId]}` } />
      : (
        <div className="bg-tertiary">
          { value.map((recipe, index) => {
            if (index >= MAX_SHOW_RECIPES) return null;
            return (
              <button
                type="button"
                className="invisible-btn"
                data-testid={ `${index}-recipe-card` }
                key={ index }
                onClick={ () => history.push(`/${path}/${recipe[ref.strId]}`) }
              >
                <div style={ { width: '18rem' } }>
                  <img
                    variant="top"
                    src={ recipe[ref.strThumb] }
                    data-testid={ `${index}-card-img` }
                  />
                  <div>
                    <h2
                      data-testid={ `${index}-card-name` }
                    >
                      { recipe[ref.strTitle] }
                    </h2>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )
  );
}
