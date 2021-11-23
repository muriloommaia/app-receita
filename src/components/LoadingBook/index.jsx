import React, { useMemo } from 'react';

import getSvgPath from './returnPath';

import './styles.css';

function LoadingBook() {
  const loaderRepeater = useMemo(() => {
    const repeater = Array.from({
      length: 6,
    },
      (_, index) => index + 1);

    return repeater;
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
        <div>
          <ul>
            {loaderRepeater.map((_) => (
              <li key={_}>
                <svg viewBox="0 0 90 120" fill="currentColor">
                  {getSvgPath()}
                </svg>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <div>
            <span className="border-t-2 p-3 w-1 rounded-full border-gray-900 animate-spin" />
          </div>
          <span>Loading...</span>
        </div>
      </div>
    </div>

  );
}

export default LoadingBook;
