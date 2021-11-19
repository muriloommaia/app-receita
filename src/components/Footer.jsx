import React from 'react';
import { useHistory } from 'react-router';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <section className="footer" data-testid="footer">
      <button
        type="button"
        className="bg-transparent border-0"
        onClick={ () => history.push('/bebidas') }
      >
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="drinks-btn"
        />
      </button>

      <button
        type="button"
        className="bg-transparent border-0"
        onClick={ () => history.push('/explorar') }
      >
        <img
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
          alt="explore-btn"
        />
      </button>

      <button
        type="button"
        className="bg-transparent border-0"
        onClick={ () => history.push('/comidas') }
      >
        <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="food-btn"
        />
      </button>

    </section>
  );
}
