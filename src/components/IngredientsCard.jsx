import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardGroup } from 'react-bootstrap';
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
    <CardGroup>
      { value.map((recipe, index) => {
        if (index >= CARD_SHOW) return null;
        return (
          <Link to={ `/${path.red}` } key={ index }>
            <button
              type="button"
              className="invisible-btn"
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
              <Card style={ { width: '18rem' } }>
                <Card.Img
                  variant="top"
                  src={ `https://www.the${path.src}db.com/images/ingredients/${recipe[base.strTitle]}-Small.png` }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    { recipe[base.strTitle] }
                  </Card.Title>
                </Card.Body>
              </Card>
            </button>
          </Link>
        );
      })}
    </CardGroup>
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
