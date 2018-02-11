import React from 'react';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
// import escapeRegExp from 'escape-string-regexp';
// import sortBy from 'sort-by';

class SearchPage extends React.Component {
  state = {
    search: ''
  }

  updateSearch = search => {
    this.setState({search: search});
    this.props.searchBook(search);
  };

  render() {
    let searchList;
    if(this.props.searchResult){
      searchList = this.props.searchResult.map(book => <BookItem key={book.id} book={book}/>);
      console.log(searchList);
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.search}
              onChange={e => this.updateSearch(e.target.value.substr(0,30))}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchList}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;