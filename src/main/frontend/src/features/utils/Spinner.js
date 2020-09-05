import React from 'react';

import './Spinner.css';

export const Spinner = ({ containerStyle, loaderStyle }) => {
  return (
    <div style={ containerStyle } className="loaderContainer">
      <div className='loader' style={loaderStyle} />
    </div>
  );
};