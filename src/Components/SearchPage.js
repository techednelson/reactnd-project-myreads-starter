import React from 'react';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import escapeRegExp from 'escape-string-regexp';

class SearchPage extends React.Component {

  state = {
    search: ''
  }

  onInputChange = search => {
    this.setState({search});
    this.props.searchTitle(search);
  };

  render() {
    let searchList, filteredList;
    if (this.state.search) {
      const match = new RegExp(escapeRegExp(this.state.search), 'i');
      searchList = this.props.searchResult.filter(search => match.test(search.title));
      filteredList = searchList.map(book => <BookItem key={book.id} book={book}/>);
    } 

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.search}
              onChange={e => this.onInputChange(e.target.value.substr(0,30))}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {filteredList}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;