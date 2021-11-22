import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchApi from '../services/fetchApi';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCards from '../components/MainCards';
import Categories from '../components/Categories';

import { changeData, changeCategories } from '../store/dataSlice';

export default function Main() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { pathname } = window.location;
  const title = pathname === '/comidas' ? 'Comidas' : 'Bebidas';

  useEffect(() => {
    async function fetchData(end, path) {
      const data = await fetchApi(end, path);
      dispatch(changeData(data));
    }
    fetchData(search, pathname);
  }, [search, dispatch, pathname]);

  useEffect(() => {
    async function fetchData(end, path) {
      const data = await fetchApi(end, path);
      dispatch(changeCategories(data));
    }
    fetchData({
      type: 'category',
      category: { categoryType: 'get' },
    }, pathname);
  }, [dispatch, pathname]);

  return (
    <div className="h-full">
      <div className="">
        <Header title={ title } />
        <Categories />
      </div>
      <div className="">
        <MainCards />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
