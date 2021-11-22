import React from 'react';
import { Button, ButtonGroup as div } from 'react-bootstrap';
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
    <div className="flex flex-col asda">
      <div className="flex flex-col md:flex-row justify-center flex-grow">
        <div className="flex justify-evenly my-1 md:my-3 md:justify-end md:w-1/2">
          {catValues.map(({ strCategory }, i) => {
            if (i <= HALF_CATEGORIES) {
              return (
                <button
                  data-testid={`${strCategory}-category-filter`}
                  key={i}
                  id="toggle-check"
                  type="checkbox"
                  className="border-4 w-1/4 mx-2 p-2 border-primary rounded-md hover:text-gray-50 hover:bg-primary"
                  checked={selectedCategory === strCategory}
                  value={strCategory}
                  onClick={handleClick}
                >
                  {strCategory}
                </button>
              );
            }
            return null;
          })}
        </div>
        <div name="category" size="sm" className="flex justify-evenly my-1 md:my-3 md:justify-start md:w-1/2">
          {catValues.map(({ strCategory }, i) => {
            if (i > MAX_CATEGORIES || i <= HALF_CATEGORIES) return null;
            return (
              <button
                data-testid={`${strCategory}-category-filter`}
                key={i}
                className="border-4 w-1/4 mx-2 p-2 border-primary rounded-md hover:text-gray-50 hover:bg-primary"
                id="toggle-check"
                type="checkbox"
                checked={selectedCategory === strCategory}
                value={strCategory}
                onClick={handleClick}
              >
                {strCategory}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
