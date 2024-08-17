// SearchBar.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

  
const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => (
  <div>{suggestion.name}</div>
);

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


function SearchBar({ onSearch, suggestionData  }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions]= useState([]);

  const handleInputChange = (event, { newValue }) => {
    setSearchTerm(newValue);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };


  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const escapedValue = escapeRegexCharacters(inputValue.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    const final = suggestionData.filter(suggestion => regex.test(suggestion.name)); 
    console.log(final);
    setSuggestions(final);
  };

  const onSuggestionsClearRequested = () => {
   
  };

  const inputProps = {
    placeholder: 'Search...',
    value: searchTerm,
    onChange: handleInputChange,
  };

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
