import React from 'react';

export const Input = ({ styleObj, isRequired, disabled = false, label, value, handleOnChange, type = 'text', onKeyDown, autoFocus = false }) => {
  return (
    <div className='group' style={styleObj}>
      <input 
        className='material-input' 
        type={type} 
        value={value} 
        onChange={handleOnChange} 
        required={isRequired} 
        disabled={disabled} 
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
      <span className='highlight'></span>
      <span className='bar'></span>
      <label className='material-label'>{label}</label>
    </div>
  )
}
