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
  if (clipboard) {
    setTimeout(() => {
      setClipboard(false);
    }, 1000);
  }
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
      className="bg-transparent border-0 mt-3 ml-3 md:mt-0"
      data-testid={`${index}-horizontal-favorite-btn`}
      onClick={() => handleClickFavorite(item)}
      src={favorite ? 'blackHeartIcon' : 'whiteHeartIcon'}
    >
      <img
        src={favorite ? blackHeartIcon : whiteHeartIcon}
        alt="favorite icon"
      />
    </button>
  );
  return (
    <div>
      <div className="p-2 px-4 block md:flex md:flex-wrap">
        {cards
          && cards.map((item, index) => {
            const foodOrDrink = item.type === 'comida' ? 'area' : 'alcoholicOrNot';
            return (
              <div
                key={index}
                className="flex my-2 p-2 md:p-0 border border-primary rounded-lg justify-evenly md:flex-col md:w-auto max-w-none md:mr-3
                md:opacity-90 md:mb-3 ml-0 md:ml-4 shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:opacity-100"
              >
                <Link to={`${item.type}s/${item.id}`}>
                  <div className="flex flex-row md:flex-col  sm:w-96 md:w-72">
                    <img
                      src={item.image}
                      alt={item.id}
                      className="w-1/3 rounded-lg md:w-auto"
                      data-testid={`${index}-horizontal-image`}
                    />
                    <div className="flex flex-col self-center text-center justify-self-center place-self-center mt-3 mx-auto">
                      <p data-testid={`${index}-horizontal-top-text`}
                        className="text-lg font-medium italic"
                      >
                        {`${item[foodOrDrink]} - ${item.category}`}
                      </p>
                      <p data-testid={`${index}-horizontal-name`}
                      className="text-xl"
                      >{item.name}</p>
                    </div>
                  </div>
                </Link>
                <div className="md:text-center flex flex-col justify-center w-1/4 md:m-auto md:pb-2">
                  <div className="flex flex-col w-10 justify-center items-center my-3 mr-3 md:w-auto md:flex-row">
                    <button
                      type="button"
                      className="bg-transparent border-0"
                      id="liveToastBtn"
                      data-testid={`${index}-horizontal-share-btn`}
                      onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:3000/${item.type}s/${item.id}`);
                        setClipboard(true);
                      }}
                      src={shareIcon}
                    >
                      <img
                        src={shareIcon}
                        alt="share icon"
                      />
                    </button>
                    {!done && favoriteButton(index, item)}
                  </div>
                  {clipboard && <p>Link copiado!</p>}
                  {done && <TagsAndDate props={{ item, index }} />}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
