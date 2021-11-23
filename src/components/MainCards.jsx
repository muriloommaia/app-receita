import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import '../styles/MainCard.css';

export default function MainCards() {
  const data = useSelector((state) => state.data.data);
  const selectedCategory = useSelector((state) => state.search.category.search);
  const history = useHistory();
  const MAX_SHOW_RECIPES = 12;
  console.log(data)
  if (!data) return <p>loading</p>;

  const value = Object.values(data)[0];
  let path = window.location.pathname;
  let ref = null;

  if (path.includes('comida')) {
    ref = { strTitle: 'strMeal', strThumb: 'strMealThumb', strId: 'idMeal' };
    path = 'comidas';
  } else {
    ref = { strTitle: 'strDrink', strThumb: 'strDrinkThumb', strId: 'idDrink' };
    path = 'bebidas';
  }

  if (!value) {
    return global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    value.length === 1 && !selectedCategory
      ? <Redirect push to={ `/${path}/${value[0][ref.strId]}` } />
      : (
        <div className="bg-tertiary flex flex-wrap justify-center px-1 md:px-3 md:justify-around transform hover:scale-100 transition duration-500 ease-in-out">
          { value.map((recipe, index) => {
            if (index >= MAX_SHOW_RECIPES) return null;
            return (
              <button
                type="button"
                className="border border-quaternary opacity-90 blur-3xl mt-2 md:mb-3 ml-0 md:ml-4 shadow-xl rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:opacity-100 md:blur-none"
                data-testid={ `${index}-recipe-card` }
                key={ index }
                onClick={ () => history.push(`/${path}/${recipe[ref.strId]}`) }
              >
                <div className="w-80 sm:w-96 md:w-72">
                  <img
                    variant="top"
                    src={ recipe[ref.strThumb] }
                    className='rounded-md'
                    data-testid={ `${index}-card-img` }
                  />
                  <div className="py-4">
                    <h2
                      data-testid={ `${index}-card-name` }
                      className=" font-sans md:font-serif text-2xl"
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
