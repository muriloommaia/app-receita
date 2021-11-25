import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function RecipesRender() {
  const data = useSelector((state) => state.data.areaData);
  const MAX_SHOW_RECIPES = 12;
  const history = useHistory();
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <div className="bg-tertiary flex flex-wrap justify-center px-1 md:px-3 md:justify-around transform hover:scale-100 transition duration-500 ease-in-out">
        {data.meals.map((recipe, index) => {
          if (index >= MAX_SHOW_RECIPES) return null;
          return (
            <button
              key={index}
              type="button"
              className="border border-quaternary opacity-90 blur-3xl mt-2 md:mb-3 ml-0 md:ml-4 shadow-xl rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:opacity-100 md:blur-none"
              data-testid={`${index}-recipe-card`}
              onClick={() => history.push(`/comidas/${recipe.idMeal}`)}
            >
              <div className="w-80 sm:w-96 md:w-72">
                <img
                  variant="top"
                  src={recipe.strMealThumb}
                  className='rounded-md'
                  data-testid={`${index}-card-img`}
                />
                <div className="py-4">
                  <p
                    data-testid={`${index}-card-name`}
                    className="   md:font-serif text-2xl"
                  >
                    {recipe.strMeal}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
