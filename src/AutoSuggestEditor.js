// AutoSuggestEditor.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const AutoSuggestEditor = ({ value, onCellValueChanged }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(value);

  const getSuggestions = (inputValue) => {
    // Implement your suggestion logic here (e.g., fetch suggestions from an API)
    // Replace the `suggestions` array with your suggestions data.
    const internalSuggets = ['Option 1', 'Option 2', 'Option 3'];
    const inputValue = value.trim().toLowerCase();
    const escapedValue = escapeRegexCharacters(inputValue.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    return internalSuggets.filter(suggestion => regex.test(suggestion.name)); 
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    // Handle the selected suggestion, update the cell value, and close the editor
    onCellValueChanged(suggestionValue);
  };

  const onChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  const inputProps = {
    placeholder: 'Type to search...',
    value: inputValue,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      inputProps={inputProps}
    />
  );
};

export default AutoSuggestEditor;
