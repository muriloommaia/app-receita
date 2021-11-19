import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchApi from '../services/fetchApi';

export default function ExploreFoodsOrDrinks() {
  const { pathname } = window.location;
  const history = useHistory();
  let ref = null;

  if (pathname === '/explorar/comidas') {
    ref = { url: 'comidas', title: 'Explorar Comidas', strId: 'idMeal' };
  } else {
    ref = { url: 'bebidas', title: 'Explorar Bebidas', strId: 'idDrink' };
  }

  async function handleClick() {
    const recipe = await fetchApi({ type: 'random' }, ref.url);
    const redirectId = Object.values(recipe)[0][0][ref.strId];
    history.push(`/${ref.url}/${redirectId}`);
  }

  return (
    <div>
      <div>
        <Header searchRender={ false } title={ ref.title } />
      </div>
      <div>
        <Link to={ `${pathname}/ingredientes` }>
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes

          </button>
        </Link>
        {ref.url === 'comidas' && (
          <Link to={ `${pathname}/area` }>
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
        )}
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
