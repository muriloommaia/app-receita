import React from 'react';
import { useHistory } from 'react-router';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <section className="footer bg-secondary bg-opacity-90" data-testid="footer">
      <button
        type="button"
        className="bg-transparent border-0"
        onClick={ () => {history.push('/bebidas')
        console.log(history)} }
      >
        {/* <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          className='text-gray-50'
          alt="drinks-btn"
        /> */}
        <i className="fas fa-cocktail text-icons text-4xl"></i>
      </button>

      <button
        type="button"
        className="bg-transparent border-0"
        onClick={ () => history.push('/explorar') }
      >
        {/* <img
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
          alt="explore-btn"
        /> */}
        <i className="fas fa-globe text-icons text-4xl"></i>
      </button>

      <button
        type="button"
        className="bg-transparent border-0"
        onClick={ () => history.push('/comidas') }
      >
        {/* <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="food-btn"
        /> */}
        <i className="fas fa-utensils text-4xl text-icons"></i>
      </button>

    </section>
  );
}
