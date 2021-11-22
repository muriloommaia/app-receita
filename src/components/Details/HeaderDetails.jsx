import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const setTags = (tags) => {
  let arrayTags = [];
  if (tags) {
    if (tags.includes(',')) {
      arrayTags = tags.replace(/\s/g, '').split(',');
    } else {
      arrayTags.push(tags);
    }
  }
  return arrayTags;
};

export default function HeaderDetails() {
  const [favorite, setFavorite] = React.useState(false);
  const [clipboard, setClipboard] = React.useState(false);
  const { detail } = useSelector((state) => state);
  const key = Object.keys(detail)[0];
  const recipe = detail[key][0];
  const path = window.location.pathname.split('/')[1];
  let ref = null;
  let localStorageObj = null;
  let actualRecipeObj = null;
  const { pathname } = window.location;
  if (path === 'comidas') {
    ref = { strTitle: 'strMeal', strThumb: 'strMealThumb', strCateg: 'strCategory' };

    localStorageObj = { id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb };
    actualRecipeObj = { ...localStorageObj, tags: setTags(recipe.strTags) };
  }
  if (path === 'bebidas') {
    ref = { strTitle: 'strDrink', strThumb: 'strDrinkThumb', strCateg: 'strAlcoholic' };
    localStorageObj = { id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb };

    actualRecipeObj = { ...localStorageObj, tags: setTags(recipe.strTags) };
  }
  if(clipboard) {
    setTimeout(() => {
      setClipboard(false);
    }, 1000);
  }
  useEffect(() => {
    const isFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === recipe.idMeal || item.id === recipe.idDrink);
    setFavorite(isFavorite);
    localStorage.setItem('actualRecipe', JSON.stringify(actualRecipeObj));
  }, [recipe, actualRecipeObj]);
  const handleClickFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const allFavorites = [...favoriteRecipes, localStorageObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const allFavorites = favoriteRecipes.filter(
        (item) => item.id !== localStorageObj.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
    }
  };
  return (
    <section className="block md:flex md:items-center md:justify-between md:mb-4">
      <div className="">
        <img
          src={ recipe[ref.strThumb] }
          alt="test"
          data-testid="recipe-photo"
          className="w-full h-48 object-cover md:w-96 md:h-auto"
        />
      </div>
      <div className="my-2 h-full flex justify-between px-4 sm:items-center sm:pr-44">
        <div className="">
          <h2 data-testid="recipe-title" className="text-2xl border-b border-gray-900 md:text-7xl font-sans md:font-serif">{ recipe[ref.strTitle] }</h2>
          <h3 data-testid="recipe-category" className="text-center text-gray-800 font-sans md:font-serif md:text-5xl">{ recipe[ref.strCateg] }</h3>
        </div>
        <div>
        <div className="flex items-center">
          <button
            type="button"
            className="bg-transparent border-0 mr-3 p-2"
            id="liveToastBtn"
            data-testid="share-btn"
            // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard - copy to clipboard
            onClick={ () => {
              const link = pathname.includes('progress')
                ? pathname.replace('/in-progress', '')
                : pathname;
              navigator.clipboard.writeText(`http://localhost:3000${link}`);
              setClipboard(true);
            } }
          >
            <img
              src={ shareIcon }
              alt="share icon"
            />
          </button>
          <button
            type="button"
            className="bg-transparent border-0"
            data-testid="favorite-btn"
            onClick={ handleClickFavorite }
            src={ favorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
            />
          </button>
        </div>
          <p className={`${clipboard ? 'visible' : 'hidden'} transform  duration-1000 transition-all opacity-90 ease-in-out`}>Link copiado!</p>
          </div>
      </div>
    </section>
  );
}
