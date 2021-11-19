// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// Import your own reducer
import userReducer from '../store/userSlice';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { user: userReducer }, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper(e) {
    return <Provider store={ store }>{e.children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, BrowserRouter, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
