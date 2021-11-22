import React from 'react';
import Header from '../components/Header';
import ButtonsFilter from '../components/favoritesAndDone/ButtonsFilter';
import BodyFavoriteAndDone from '../components/favoritesAndDone/BodyFavoriteAndDone';

export default function FavoriteRecipes() {
  const title = window.location.pathname.includes('favoritas') ? 'Favoritas' : 'Feitas';
  return (
    <div className="h-screen">
      <Header searchRender={ false } title={ `Receitas ${title}` } />
      <ButtonsFilter />
      <BodyFavoriteAndDone />
    </div>
  );
}
