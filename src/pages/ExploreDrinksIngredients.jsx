import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinksIngredients() {
  return (
    <div>
      <div>
        <Header searchRender={ false } title="Explorar Ingredientes" />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
