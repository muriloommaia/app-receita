import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import TagsAndDate from './TagsAndDate';

const setKeyName = (pathname) => (pathname.includes('favoritas')
  ? 'favoriteRecipes'
  : 'doneRecipes');

export default function BodyFavoriteAndDone() {
  const [favorite] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const [clipboard, setClipboard] = React.useState(false);
  const { filter } = useSelector((state) => state.filterFav);
  const [cards, setCards] = React.useState([]);
  const { pathname } = window.location;
  const keyName = setKeyName(pathname);
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(keyName));
    if (filter === 'all') {
      setCards(favorites);
    } else {
      const filterFav = favorites.filter((fav) => fav.type === filter);
      setCards(filterFav);
    }
    if (pathname.includes('feitas')) {
      setDone(true);
    }
  }, [filter, pathname, keyName]);
  const handleClickFavorite = (itemObj) => {
    const allFavorites = cards.filter(
      (item) => item.id !== itemObj.id,
    );
    localStorage.setItem(keyName, JSON.stringify(allFavorites));
    setCards(allFavorites);
  };
  const favoriteButton = (index, item) => (
    <button
      type="button"
      className="bg-transparent border-0"
      data-testid={ `${index}-horizontal-favorite-btn` }
      onClick={ () => handleClickFavorite(item) }
      src={ favorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
    >
      <img
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite icon"
      />
    </button>
  );
  return (
    <div>
      <div>
        { cards
        && cards.map((item, index) => {
          const foodOrDrink = item.type === 'comida' ? 'area' : 'alcoholicOrNot';
          return (
            <div
              key={ index }
            >
              <Link to={ `${item.type}s/${item.id}` }>
                <img
                  src={ item.image }
                  alt={ item.id }
                  className="w-25"
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${item[foodOrDrink]} - ${item.category}`}
                </p>
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <div>
                <button
                  type="button"
                  className="bg-transparent border-0"
                  id="liveToastBtn"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    navigator.clipboard.writeText(`http://localhost:3000/${item.type}s/${item.id}`);
                    setClipboard(true);
                  } }
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt="share icon"
                  />
                </button>
                { !done && favoriteButton(index, item) }
                { clipboard && <p>Link copiado!</p> }
              </div>
              { done && <TagsAndDate props={ { item, index } } />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
