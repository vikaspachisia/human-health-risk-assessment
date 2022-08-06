import React from 'react';

const RadioButton = ({ name, value, required, _handleChange }) => {
  <div>
    <input
      type="radio"
      name={name}
      value={value}
      required={required}
      onChange={_handleChange}
    /> {value}
  </div>
};

export default RadioButton;
