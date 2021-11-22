import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import StyleInputGen from '../pages/templates/StyleInputGen';
import { changeSearch } from '../store/searchSlice';
import InputGen from './InputGen';

export default function HeaderSearch() {
  const [search, setSearch] = useState('');
  const [inputRadio, setInputRadio] = useState('');
  const dispatch = useDispatch();

  const className = 'flex flex-row-reverse mr-1 ml-2'

  const configInput = ['text', 'search', 'search-input', search, false,
    ({ target }) => setSearch(target.value), 'Buscar', ' ml-1 rounded-lg focus:outline-none focus:border-primary border-2'];

  const configIngrediente = ['radio', 'type', 'ingredient-search-radio', 'ingredient',
    false, ({ target }) => setInputRadio(target.value), 'Ingrediente', className];

  const configNome = ['radio', 'type', 'name-search-radio', 'name',
    false, ({ target }) => setInputRadio(target.value), 'Nome', className];

  const configPrimeiraLetra = ['radio', 'type', 'first-letter-search-radio',
    'first-letter', false, ({ target }) => setInputRadio(target.value),
    'Primeira Letra', className];

  const handleClick = () => {
    const alert = 'Sua busca deve conter somente 1 (um) caracter';
    if (inputRadio === 'first-letter' && search.length !== 1) return global.alert(alert);
    dispatch(changeSearch({
      type: 'radio',
      radio: { search, isClicked: true, radioType: inputRadio },
    }));
  };
  return (
    <div className="flex flex-col items-center transition duration-1000 ease-in-out mt-1 md:mt-4 transform">
      <div className="mb-2">
        <InputGen config={configInput} />
      </div>
      <div className="flex">
        <StyleInputGen>
          <InputGen config={configIngrediente} />
        </StyleInputGen>
        <StyleInputGen>
          <InputGen config={configNome} />
        </StyleInputGen>
        <StyleInputGen>
          <InputGen config={configPrimeiraLetra} />
        </StyleInputGen>
      </div>
      <div>
        <button
          type="button"
          onClick={handleClick}
          disabled={inputRadio === ''}
          className="bg-primary disabled:opacity-50 border border-gray-900 px-3 py-1 m-2 rounded-md"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
