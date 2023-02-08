import { useState } from 'react';
import PropTypes from 'prop-types';


const Searchbar = ({onSubmit}) => {
  
  const [query, setQuery] = useState('');

  const hadleInputChange = event => {
    setQuery(event.target.value)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={hadleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar;
