import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearch } from '../store/searchSlice';
import InputGen from './InputGen';

export default function HeaderSearch() {
  const [search, setSearch] = useState('');
  const [inputRadio, setInputRadio] = useState('');
  const dispatch = useDispatch();

  const configInput = ['text', 'search', 'search-input', search, false,
    ({ target }) => setSearch(target.value), 'Buscar', ''];

  const configIngrediente = ['radio', 'type', 'ingredient-search-radio', 'ingredient',
    false, ({ target }) => setInputRadio(target.value), 'Ingrediente', ''];

  const configNome = ['radio', 'type', 'name-search-radio', 'name',
    false, ({ target }) => setInputRadio(target.value), 'Nome', ''];

  const configPrimeiraLetra = ['radio', 'type', 'first-letter-search-radio',
    'first-letter', false, ({ target }) => setInputRadio(target.value),
    'Primeira Letra', ''];

  const handleClick = () => {
    const alert = 'Sua busca deve conter somente 1 (um) caracter';
    if (inputRadio === 'first-letter' && search.length !== 1) return global.alert(alert);
    dispatch(changeSearch({
      type: 'radio',
      radio: { search, isClicked: true, radioType: inputRadio },
    }));
  };
  return (
    <div>
      <div>
        <InputGen config={ configInput } />
      </div>
      <div className="d-flex">
        <InputGen config={ configIngrediente } />
        <InputGen config={ configNome } />
        <InputGen config={ configPrimeiraLetra } />
      </div>
      <div>
        <button
          type="button"
          onClick={ handleClick }
          disabled={ inputRadio === '' }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
