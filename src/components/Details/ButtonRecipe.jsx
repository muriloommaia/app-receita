import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { changeCheck } from '../../store/checkSlice';

const handleClick = (setIsOpen, isOpen, allCheck) => {
  setIsOpen(!isOpen);
  if (!isOpen && allCheck) {
    const actualRecipe = JSON.parse(localStorage.getItem('actualRecipe'));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    actualRecipe.doneDate = new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, actualRecipe]));
  }
};

export default function ButtonRecipe({ testBtn }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [text, setText] = React.useState('Iniciar');
  const { allCheck } = useSelector((state) => state.allChecked);
  const { pathname } = window.location;
  useEffect(() => {
    dispatch(changeCheck(false));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const keyName = pathname.includes('comidas') ? 'meals' : 'cocktails';
    const ingredientsSaved = inProgressRecipes[keyName][pathname.split('/')[2]];
    if (ingredientsSaved) {
      setText('Continuar');
    }
    setIsOpen(false);
  }, [pathname, dispatch]);

  if (isOpen && allCheck) return <Redirect to="/receitas-feitas" />;
  if (isOpen) return <Redirect to={ `${pathname}/in-progress` } />;
  if (pathname.includes('in-progress')) {
    return (
      <div className="disabled:opacity-50">
        <button
          type="button"
          disabled={ !allCheck }
          data-testid={ `${testBtn}-recipe-btn` }
          className="fixed bottom-0 p-3 border bg-primary text-gray-50 left-1/2 transform -translate-x-2/4 disabled:opacity-0"
          onClick={ () => handleClick(setIsOpen, isOpen, allCheck) }
        >
          {`${allCheck ? 'Finalizar' : text} Receita`}
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        type="button"
        data-testid={ `${testBtn}-recipe-btn` }
        className="fixed bottom-0 p-3 border bg-primary text-gray-50 left-1/2 transform -translate-x-2/4 disabled:opacity-50"
        onClick={ () => handleClick(setIsOpen, isOpen, allCheck) }
      >
        {`${text} Receita`}
      </button>
    </div>
  );
}

ButtonRecipe.propTypes = {
  testBtn: PropTypes.string,
};

ButtonRecipe.defaultProps = {
  testBtn: 'start',
};
