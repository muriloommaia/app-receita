import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Explore from '../pages/Explore';
import { screen } from '../test-utils/test-utils';

describe('Explore', () => {
  it('has the expected texts in the screen', () => {
    render(<BrowserRouter><Explore /></BrowserRouter>);
    const explorarComidas = screen.getByText(/explorar comidas/i);
    const explorarBebidas = screen.getByText(/explorar bebidas/i);

    expect(explorarComidas).toBeInTheDocument();
    expect(explorarBebidas).toBeInTheDocument();
  });

  test('if goes to "/explorar/comidas" when click "Explorar Comidas"', () => {
    render(<BrowserRouter><Explore /></BrowserRouter>);
    const button1 = screen.getByRole('button', {
      name: /explorar comidas/i,
    });
    button1.click();
    expect(window.location.pathname).toBe('/explorar/comidas');
  });

  test('if goes to "/explorar/bebidas" when click "Explorar Bebidas"', () => {
    render(<BrowserRouter><Explore /></BrowserRouter>);
    const button2 = screen.getByRole('button', {
      name: /explorar bebidas/i,
    });
    button2.click();
    expect(window.location.pathname).toBe('/explorar/bebidas');
  });
});
