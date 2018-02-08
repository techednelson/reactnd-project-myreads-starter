import React from 'react';
import Reading from './Components/Reading';
import WantToRead from './Components/WantToRead';
import Read from './Components/Read';
import SearchPage from './SearchPage';
import * as BooksAPI from './Api/BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Reading cover={this.state.booksReading} />
                <ToRead cover={this.state.booksToRead} />
                <Read cover={this.state.booksRead} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
