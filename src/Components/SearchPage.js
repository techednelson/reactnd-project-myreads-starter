import React from 'react';
import { Link } from 'react-router-dom';

function SearchPage(props) {

  const search = book => {
    props.searchInput(book);
  };

  return (
    <div className="search-books-bar">
      <Link className="close-search" to="/">Close</Link>
      <div className="search-books-input-wrapper">
        <input 
          type="text" 
          placeholder="Search by title or author"
          onChange={e => search(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchPage;