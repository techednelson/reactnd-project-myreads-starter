import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Reading from './Components/Reading';
import WantToRead from './Components/WantToRead';
import Read from './Components/Read';
import SearchPage from './Components/SearchPage';
import * as BooksAPI from './Api/BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    booksInventory: [],
    booksReading: [],
    booksToRead: [],
    booksRead: [],
    searchResult: []
  }

  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({booksInventory: books});
      this.organizeShelfs();
    });
  }

  organizeShelfs = () => {
    this.setState({booksReading: this.state.booksInventory.filter(book => book.shelf === 'currentlyReading')});
    this.setState({booksToRead: this.state.booksInventory.filter(book => book.shelf === 'wantToRead')});
    this.setState({booksRead: this.state.booksInventory.filter(book => book.shelf === 'read')});
  };

  updateShelfControl = (bookItem, val, state) => {
    return state.map(book => {
      if(book.id === bookItem.id ){
        book.shelf = val;
      }
        return book;
    });
  };

  moveToShelf = (bookItem, val, addBookToShelf) => {
    if(addBookToShelf) {
      BooksAPI.update(bookItem, val).then(BooksAPI.getAll().then(books => {
        this.setState({booksInventory: books});
        this.organizeShelfs();
      }));
      let searchFiltered = this.updateShelfControl(bookItem, val, this.state.searchResult);
      this.setState({searchResult: searchFiltered});
    } else {
      let books = this.updateShelfControl(bookItem, val, this.state.booksInventory);
      this.setState({booksInventory: books});
      this.organizeShelfs();
      BooksAPI.update(bookItem, val);
    }
  };

  searchTitle = (search) => {
    BooksAPI.search(search).then(books => {
      let filtered = books.map(book => {
        for(const element of this.state.booksInventory) {
          if(book.id === element.id || book.title === element.title) {
            return element;
          } 
        }
        return book;
      });
      this.setState({searchResult: filtered});
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (     
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Reading cover={this.state.booksReading} moveToShelf={this.moveToShelf} />
                <WantToRead cover={this.state.booksToRead} moveToShelf={this.moveToShelf} />
                <Read cover={this.state.booksRead} moveToShelf={this.moveToShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <SearchPage searchTitle={this.searchTitle} searchResult={this.state.searchResult} moveToShelf={this.moveToShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
