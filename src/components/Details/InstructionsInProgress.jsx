import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCheck } from '../../store/checkSlice';

export default function InstructionsInProgress() {
  const { detail } = useSelector((state) => state);
  const dispatch = useDispatch();
  const key = Object.keys(detail)[0];
  const { pathname } = window.location;
  const recipe = detail[key][0];
  const { strInstructions } = recipe;
  const ingredients = [];
  const measures = [];
  function addIngredientsAndMeasures() {
    let stop = true;
    for (let i = 1; stop; i += 1) {
      if (recipe[`strIngredient${i}`] === '' || !recipe[`strIngredient${i}`]) {
        stop = false;
      } else {
        ingredients.push(recipe[`strIngredient${i}`]);
        measures.push(recipe[`strMeasure${i}`]);
      }
    }
  }
  addIngredientsAndMeasures();

  const saveLocalStorage = () => {
    const localStorageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const keyName = pathname.includes('comidas') ? 'meals' : 'cocktails';
    const labels = document.querySelector('.instructions');
    localStorageObj[keyName] = {
      ...localStorageObj[keyName],
      [pathname.split('/')[2]]: labels.innerHTML,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageObj));
  };
  const handleChangeProgress = ({ target }) => {
    target.parentNode.classList.toggle('done');

    const labels = document.querySelectorAll('label');
    const allChecks = [...labels].every((label) => label.firstElementChild.checked);
    dispatch(changeCheck(allChecks));
    saveLocalStorage();
  };

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const keyName = pathname.includes('comidas') ? 'meals' : 'cocktails';
    const ingredientsSaved = inProgressRecipes[keyName][pathname.split('/')[2]];
    if (ingredientsSaved) {
      const parent = document.querySelector('.instructions');
      parent.innerHTML = ingredientsSaved;
      const labels = document.querySelectorAll('label');
      labels.forEach((label) => {
        if (label.classList.contains('done')) {
          label.firstElementChild.setAttribute('checked', true);
        }
        label.firstChild.addEventListener('click', (e) => handleChangeProgress(e));
      });
    }
    saveLocalStorage();
  }, []);
  return (
    <section>
      <div className="all-ingredients">
        { ingredients.map((ingredient, index) => (
          <div key={ index } className="d-flex">
            <label
              htmlFor={ index }
              className="ingredient"
              data-testid={ `${index}-ingredient-step` }
              onChange={ handleChangeProgress }
            >
              <input type="checkbox" id={ index } />
              {`${ingredient} - ${measures[index]}`}
            </label>
          </div>
        ))}
      </div>
      <div>
        <p data-testid="instructions">{ strInstructions }</p>
      </div>
    </section>
  );
}
