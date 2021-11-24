import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeSearch } from '../store/searchSlice';

import '../styles/MainCard.css';

function IngredientsCards({ value, base, CARD_SHOW, path }) {
  const dispatch = useDispatch();
  path = path.includes('comidas')
    ? { red: 'comidas', src: 'meal' }
    : { red: 'bebidas', src: 'cocktail' };

  if (!value) {
    return global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div className="bg-tertiary flex flex-wrap justify-center px-1 md:px-3 md:justify-around transform hover:scale-100 transition duration-500 ease-in-out pt-3">
      { value.map((recipe, index) => {
        if (index >= CARD_SHOW) return null;
        return (
          <Link to={ `/${path.red}` } key={ index }>
            <button
              type="button"
              className="border border-quaternary opacity-90 blur-3xl mt-2 md:mb-3 ml-0 md:ml-4 shadow-xl rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:opacity-100 md:blur-none"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => {
                dispatch(changeSearch({
                  type: 'ingredients',
                  ingredients: {
                    search: recipe[base.strTitle],
                    ingredientsType: 'filter' },
                }));
              } }
            >
              <div className="flex items-center w-80 sm:w-96 md:w-72">
                <img
                  variant="top"
                  src={ `https://www.the${path.src}db.com/images/ingredients/${recipe[base.strTitle]}-Small.png` }
                  className='rounded-md'

                  data-testid={ `${index}-card-img` }
                />
                <div className="flex w-full justify-center">
                  <p
                    data-testid={ `${index}-card-name` }
                    className="mx-auto font-sans md:font-serif text-2xl"
                  >
                    { recipe[base.strTitle] }
                  </p>
                </div>
              </div>
            </button>
          </Link>
        );
      })}
    </div>
  );
}

export default IngredientsCards;

IngredientsCards.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  base: PropTypes.objectOf(PropTypes.string),
  CARD_SHOW: PropTypes.number,
  path: PropTypes.string,
};

IngredientsCards.defaultProps = {
  value: [],
  base: { strTitle: 'strMeal', strThumb: 'strMealThumb', strId: 'idMeal' },
  CARD_SHOW: 12,
  path: '',
};
