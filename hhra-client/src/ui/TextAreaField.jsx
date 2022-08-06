import React from 'react';

const TextAreaFeild = ({ name, placeholder, required, _handleChange }) => {
  <div>
    <textarea
      type="text"
      name={name}
      required={required}
      style={{height : "80px"} }
      autoComplete="off"
      placeholder={placeholder}
      onChange={_handleChange}
    />
  </div>
};

export default TextAreaFeild;
