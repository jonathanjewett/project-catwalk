import React from 'react';

/**
 * @param {Object} props
 * @param {string=} props.placeholder
 * @param {string} props.value
 * @param {React.Dispatch<React.SetStateAction<string>>} props.set
 */
const Search = ({ placeholder, value, set }) => (
  <input
    type="text"
    className="interact"
    placeholder={placeholder}
    value={value}
    onChange={event => set(event.target.value)}
  />
);

export default Search;
