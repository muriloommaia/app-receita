import React from 'react';
import PropTypes from 'prop-types';

export default function TagsAndDate({ props: { item, index } }) {
  const { tags } = item;
  return (
    <div>
      <div>
        <p data-testid={ `${index}-horizontal-done-date` }>
          {`Done in: ${item.doneDate}`}
        </p>
      </div>
      <div>
        { tags.map((tag) => (
          <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
            { tag }
          </p>
        ))}
      </div>
    </div>
  );
}

TagsAndDate.propTypes = {
  props: PropTypes.objectOf(PropTypes.any).isRequired,
};
