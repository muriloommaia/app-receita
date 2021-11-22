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
    <div className="my-3 relative flex justify-center w-3/4 md:w-1/2 text-gray-700 mx-auto">
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-50 border bg-gray-50 border-primary rounded-lg appearance-none focus:shadow-outline text-center cursor-pointer"
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
