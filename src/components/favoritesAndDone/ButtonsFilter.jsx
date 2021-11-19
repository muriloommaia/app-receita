import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../store/filterFavorite';

export default function ButtonsFilter() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => dispatch(changeFilter('all')) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => dispatch(changeFilter('comida')) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => dispatch(changeFilter('bebida')) }
      >
        Drinks
      </button>
    </div>
  );
}
