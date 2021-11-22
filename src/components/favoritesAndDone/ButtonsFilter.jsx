import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../store/filterFavorite';

export default function ButtonsFilter() {
  const dispatch = useDispatch();
  const className = 'border-2 w-1/4 mx-2 p-2 border-primary rounded-md hover:text-gray-50 hover:bg-primary transition duration-300 ease-in-out transform  focus:bg-primary focus:text-gray-50';
  return (
    <div className="flex my-5 justify-center">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => dispatch(changeFilter('all')) }
        className={ className }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => dispatch(changeFilter('comida')) }
        className={ className }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => dispatch(changeFilter('bebida')) }
        className={ className }
      >
        Drinks
      </button>
    </div>
  );
}
