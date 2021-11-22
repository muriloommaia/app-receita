import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const className = 'border-2 w-60 mx-2 p-2 mt-3 border-primary rounded-md hover:text-gray-50 hover:bg-primary transition duration-300 ease-in-out transform  focus:bg-primary focus:text-gray-50 md:w-72'
  return (
    <div className="h-screen">
      <div>
        <Header searchRender={false} title="Explorar" />
      </div>
      <div className="flex flex-col justify-center items-center h-96">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className={className}
          >Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            className={className}
            data-testid="explore-drinks"
          >Explorar Bebidas</button>
        </Link>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
