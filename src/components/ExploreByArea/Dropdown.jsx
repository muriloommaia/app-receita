import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '../../store/searchSlice';

export default function Dropdown() {
  const areas = useSelector((state) => state.data.area);
  const [areaValue, setAreaValue] = React.useState('All');
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    setAreaValue(target.value);
  };
  useEffect(() => {
    dispatch(changeSearch({ area: areaValue }));
  }, [areaValue, dispatch]);
  if (!areas) return <div>Loading...</div>;
  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
        value={ areaValue }
      >
        {['All', ...areas].map((area) => (
          <option
            key={ area }
            value={ area }
            data-testid={ `${area}-option` }
          >
            {area}

          </option>
        ))}
      </select>
    </div>
  );
}
