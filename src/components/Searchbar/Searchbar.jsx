import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleNameChange = event =>
    setQuery(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return toast('Please enter a valid request');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <input
          value={query}
          onChange={handleNameChange}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={styles.SearchFormButton}>
          <SearchIcon />
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
