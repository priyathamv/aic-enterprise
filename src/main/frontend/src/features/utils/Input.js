import React from 'react';

export const Input = ({ styleObj, isRequired, label, value, handleOnChange }) => {
  return (
    <div className='group' style={styleObj}>
      <input className='material-input' type='text' value={value} onChange={handleOnChange} required={isRequired} />
      <span className='highlight'></span>
      <span className='bar'></span>
      <label className='material-label'>{label}</label>
    </div>
  )
}
