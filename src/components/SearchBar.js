import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location); // 调用父组件传入的 onSearch 函数，将 location（ZIP code 或城市名称）作为参数
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name or ZIP code"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;