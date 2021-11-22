import React from 'react';
import PropTypes from 'prop-types';

export default function InputGen({ config }) {
  const [type, name, dataTestId, value, checked, onChange, labelText,
    className] = config;

  if (checked === false) {
    return (
      <label htmlFor={ dataTestId } data-testid={ `${dataTestId}-label` }>
        <span>{ labelText }</span>
        <input
          type={ type }
          name={ name }
          data-testid={ dataTestId }
          id={ dataTestId }
          value={ value }
          onChange={ onChange }
          className={ className }
        />
      </label>
    );
  }

  return (
    <label htmlFor={ dataTestId } data-testid={ `${dataTestId}-label` }>
      <span>{ labelText }</span>
      <input
        type={ type }
        name={ name }
        data-testid={ dataTestId }
        checked={ checked }
        onChange={ onChange }
      />
    </label>
  );
}

InputGen.propTypes = {
  config: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
};
