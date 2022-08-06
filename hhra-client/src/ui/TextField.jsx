import React from 'react';

const TextField = ({ name, placeholder, required, _handleChange }) => {
  <div>
    <input
      type="text"
      name={name}
      required={required}
      autoComplete="off"
      placeholder={placeholder}
      onChange={_handleChange}
    />
  </div>
};

export default TextField;
