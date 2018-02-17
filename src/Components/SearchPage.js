import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchItem from './SearchItem';
import escapeRegExp from 'escape-string-regexp';

class SearchPage extends Component {

  state = {
    search: ''
  };

  /*This method will be triggered once the input value is changed. It will update search state and send to its parent(App) a search request with the input value(book title) as parameter*/
  onInputChange = search => {
    this.setState({search});
    this.props.searchTitle(search);
  };

  /*This method received from its child(SearchItem) and sends to its parent component(App) the book Item that was clicked and in which shelf needs to be allocated in main page. The third paramenter is a flag to let know moveToShelf method in App.js is we are handling a change triggered in SearchItem or BookItem*/
  moveToShelf = (bookItem, shelf) => {
    this.props.moveToShelf(bookItem, shelf, true);
  };

  /*Before rendering the search results, they will be filtered matching the search query with the title of each book form the search and finaled converted into an array of SearchItemp components*/
  render() {
    let searchList, filteredList;
    if (this.state.search) {
      const match = new RegExp(escapeRegExp(this.state.search), 'i');
      searchList = this.props.searchResult.filter(search => match.test(search.title));
      filteredList = searchList.map(book => <SearchItem key={book.id} book={book} moveToShelf={this.moveToShelf} />);
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