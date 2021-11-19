import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearch } from '../store/searchSlice';

function Categories() {
  const categories = useSelector((state) => state.data.categories);
  const selectedCategory = useSelector((state) => state.search.category.search);
  const dispatch = useDispatch();

  if (!categories) return <p>Loading ...</p>;

  const catValues = [{ strCategory: 'All' }, ...Object.values(categories)[0]];
  const HALF_CATEGORIES = 2;
  const MAX_CATEGORIES = 5;

  function handleClick({ target: { value } }) {
    if (selectedCategory === value || value === 'All') {
      return dispatch(changeSearch({ type: '', category: { search: '' } }));
    }
    dispatch(changeSearch({
      type: 'category',
      category: { search: value, isClicked: false, categoryType: 'filter' },
    }));
  }

  return (
    <div className="d-flex flex-column">
      <ButtonGroup name="category" size="sm" className="d-flex justify-content-evenly">
        { catValues.map(({ strCategory }, i) => {
          if (i <= HALF_CATEGORIES) {
            return (
              <Button
                data-testid={ `${strCategory}-category-filter` }
                key={ i }
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={ selectedCategory === strCategory }
                value={ strCategory }
                onClick={ handleClick }
              >
                { strCategory }
              </Button>
            );
          }
          return null;
        })}
      </ButtonGroup>
      <ButtonGroup name="category" size="sm">
        { catValues.map(({ strCategory }, i) => {
          if (i > MAX_CATEGORIES || i <= HALF_CATEGORIES) return null;
          return (
            <Button
              data-testid={ `${strCategory}-category-filter` }
              key={ i }
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={ selectedCategory === strCategory }
              value={ strCategory }
              onClick={ handleClick }
            >
              { strCategory }
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

export default Categories;
