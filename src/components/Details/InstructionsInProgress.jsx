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
  console.log('se apareceu deu ruim')

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
    <section className="px-4  pt-4 rounded-3xl">
      <div className="w-full flex justify-center">
        <div className=" w-14 border-t-4 border-gray-500" />
      </div>
      <div className="all-ingredients mt-8">
        <p className="font-bold text-lg mb-2"> Ingredients </p>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="">
            <label
              htmlFor={index}
              className="ingredient ingredients text-lg md:text-xl subpixel-antialiased text-gray-800 cursor-pointer"
              data-testid={`${index}-ingredient-step`}
              onChange={handleChangeProgress}
            >
              <input type="checkbox" id={index} className="mr-2" />
              {`${ingredient} - ${measures[index]}`}
            </label>
          </div>
        ))}
      </div>
      <div className="my-2 mt-5 pb-12">
        <p className="font-bold mb-2 text-lg"> Instructions </p>
        <p data-testid="instructions "
          className="text-justify text-gray-700 md:text-xl"
        >{strInstructions}</p>
      </div>
    </section>
  );
}
