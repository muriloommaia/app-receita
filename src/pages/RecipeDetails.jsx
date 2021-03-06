import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ButtonRecipe from '../components/Details/ButtonRecipe';
import HeaderDetails from '../components/Details/HeaderDetails';
import Instructions from '../components/Details/Instructions';
import InstructionsInProgress from '../components/Details/InstructionsInProgress';
import Recomendations from '../components/Details/Recomendations';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook';
import fetchApi from '../services/fetchApi';
import { changeDetail } from '../store/detailSlice';
import { changeSearch } from '../store/searchSlice';
import './css/recipeDetails.css';

// pair programming Pedro  e Mu rilo
export default function RecipeDetails(props) {
  const [isFetching, setIsFetching] = React.useState(false);

  const { pathname } = window.location;
  const { match: { params: { id } } } = props;
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(changeSearch({ type: '', category: { search: '' } }));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApi(
        { type: 'details', details: { search: id } }, pathname,
      );
      if (response) {
        dispatch(changeDetail(response));
        setIsFetching(true);
      }
    };
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.favoriteRecipes = JSON.stringify([]);
    }
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.inProgressRecipes = JSON.stringify({ cocktails: {}, meals: {} });
    }
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.doneRecipes = JSON.stringify([]);
    }
    fetchData();
  }, [dispatch, id, pathname]);
  if (!isFetching) return <LoadingBook />;
  if (pathname.includes('progress')) {
    return (
      <div>
        <HeaderDetails />
        <div className="instructions bg-gray-50 rounded-t-3xl">
          <InstructionsInProgress />
        </div>
        <ButtonRecipe testBtn="finish" />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <HeaderDetails />
      <div className="bg-gray-50 rounded-t-3xl">
        <Instructions />
        <Recomendations />
        <ButtonRecipe />
      </div>
      <Footer />
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
