import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomDrink } from '../tests/fetchApiRandom';

export default function Explore() {
  return (
    <div>
      <div>
        <Header searchRender={ false } title="Explorar Bebidas" />
      </div>
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes

          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => getRandomDrink() }
          >
            Me Surpreenda!

          </button>
        </Link>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
