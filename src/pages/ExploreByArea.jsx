import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../components/ExploreByArea/Dropdown';
import RecipesRender from '../components/ExploreByArea/RecipesRender';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchApi from '../services/fetchApi';
import { changeArea, changeFoodArea } from '../store/dataSlice';

export default function ExploreByArea() {
  const { pathname } = window.location;
  const dispatch = useDispatch();
  const actualArea = useSelector((state) => state.search.area);
  useEffect(() => {
    async function fetchData(end, path) {
      const data = await fetchApi(end, path);
      dispatch(changeArea(data.meals.map((meal) => meal.strArea)));
    }
    fetchData({
      type: 'category',
      category: { categoryType: 'area' },
    }, pathname);
  }, [dispatch, pathname]);

  useEffect(() => {
    async function fetchData(end, path) {
      const data = await fetchApi(end, path);
      dispatch(changeFoodArea(data));
    }
    if (actualArea === 'All') {
      fetchData({ type: '', category: { search: '' } }, pathname);
    } else {
      fetchData({
        type: 'getByArea',
        getByArea: { search: actualArea },
      }, pathname);
    }
  }, [dispatch, pathname, actualArea]);

  return (
    <div>
      <Header searchRender title="Explorar Origem" />
      <Dropdown />
      <RecipesRender />
      <Footer />
    </div>
  );
}
