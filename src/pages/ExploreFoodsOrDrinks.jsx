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
  const className = 'border-2 w-60 mx-2 p-2 mt-3 border-primary rounded-md hover:text-gray-50 hover:bg-primary transition duration-300 ease-in-out transform  focus:bg-primary focus:text-gray-50 md:w-72'
  return (
    <div className="h-screen">
      <div>
        <Header searchRender={ false } title={ ref.title } />
      </div>
      <div className="flex flex-col justify-center items-center h-96">
        <Link to={ `${ref.url}/ingredientes` }>
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className={className}
          >
            Por Ingredientes

          </button>
        </Link>
        {ref.url === 'comidas' && (
          <Link to={ `${pathname}/area` }>
            <button
              type="button"
              className={className}

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
          className={className}

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
