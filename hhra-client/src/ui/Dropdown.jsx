import React from 'react';

const DropdownSelect = ({ name, placeholder, required, values, _handleChange }) => {
  <div>
    <label>{placeholder}</label>
    <select name={name} required={required} onChange={_handleChange}>
      <option value="">Select an option</option>
      {values.map(val => <option value={val} key={val}>{val}</option>)}
    </select >
  </div >
};

export default DropdownSelect;
