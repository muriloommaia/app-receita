import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import fetchApi from '../../services/fetchApi';
import LoadingBook from '../LoadingBook';

export default function Recomendations() {
  const { detail } = useSelector((state) => state);
  const [isFetching, setIsFetching] = React.useState(false);
  const [recomendations, setRecomendations] = React.useState([]);
  let key = Object.keys(detail)[0];
  const recipe = detail[key][0];
  const { strYoutube } = recipe;
  const idYoutube = strYoutube ? strYoutube.split('v=')[1] : null;
  let path = window.location.pathname;
  let strTitle = null;
  let strThumb = null;
  if (path.includes('comida')) {
    strTitle = 'strDrink';
    strThumb = 'strDrinkThumb';
    path = '/bebidas';
    key = 'drinks';
  } else {
    strTitle = 'strMeal';
    strThumb = 'strMealThumb';
    path = '/comidas';
    key = 'meals';
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApi({
        inputRadio: 'name',
        search: '',
      }, path);
      setRecomendations(response[key]);
      setIsFetching(true);
    };
    fetchData();
  }, [key, path]);
  if (!isFetching) return <LoadingBook />;
  return (
    <div className="pb-7">
      { strYoutube && (
        <div className="mb-7 flex flex-col">
          <h1 className="font-bold text-2xl px-4">Vídeo</h1>
          <iframe
            src={ `https://www.youtube.com/embed/${idYoutube}` }
            title="video"
            frameBorder="0"
            allowFullScreen
            data-testid="video"
            className="justify-self-center md:w-3/4 md:h-96 md:self-center"
          />
        </div>
      )}
      <div className="w-full p-4">
      <p className="font-bold text-2xl mb-3">Recomendations</p>
      <div className="flex w-full overflow-x-scroll border p-3 px-4 ">
        { recomendations.map((item, index) => {
          const MAX_CARDS = 5;
          if (index > MAX_CARDS) return null;
          return (
            <div
              key={ index }
              className="w-80 sm:w-96 md:w-72 mr-3 shadow-2xl rounded-3xl border-primary border"
              data-testid={ `${index}-recomendation-card` }
            >
              <img  className="w-72 max-w-none rounded-t-3xl" src={ item[strThumb] } alt={ item[strTitle] } />
              <p data-testid={ `${index}-recomendation-title` }
              className="text-xl text-center py-2"
              >{item[strTitle]}</p>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
