import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fetchApi from '../services/fetchApi';

import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientsCard from '../components/IngredientsCard';
import LoadingBook from '../components/LoadingBook';

export default function ExploreByIngredients() {
  const [ingredients, setIngedients] = useState();
  let ref = {
    strTitle: 'strIngredient',
    strThumb: 'strIngredientThumb',
    strId: 'idIngredient',
  };

  const history = useHistory();
  const { pathname } = history.location;

  if (pathname.includes('bebidas')) {
    ref = {
      strTitle: 'strIngredient1',
      strThumb: 'strIngredient1Thumb',
      strId: 'idIngredient1',
    };
  }

  useEffect(() => {
    async function fetchData(search, end) {
      const data = await fetchApi(search, end);
      setIngedients(data);
    }
    fetchData({ type: 'ingredients', ingredients: { ingredientsType: 'get' } }, pathname);
  }, [pathname]);

  if (!ingredients) return <LoadingBook />;

  const ingredientsArray = Object.values(ingredients)[0];

  return (
    <div>
      <div>
        <Header searchRender={ false } title="Explorar Ingredientes" />
      </div>
      <div>
        <IngredientsCard value={ ingredientsArray } base={ ref } path={ pathname } />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
