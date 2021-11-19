import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function RecipesRender() {
  const data = useSelector((state) => state.data.areaData);
  const MAX_SHOW_RECIPES = 12;
  const history = useHistory();
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <CardGroup>
        {data.meals.map((recipe, index) => {
          if (index >= MAX_SHOW_RECIPES) return null;
          return (
            <button
              key={ index }
              type="button"
              className="border-none border-0 bg-white"
              data-testid={ `${index}-recipe-card` }
              onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
            >
              <Card style={ { width: '18rem' } }>
                <Card.Img
                  variant="top"
                  src={ recipe.strMealThumb }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    { recipe.strMeal }
                  </Card.Title>
                </Card.Body>
              </Card>
            </button>
          );
        })}
      </CardGroup>
    </div>
  );
}
