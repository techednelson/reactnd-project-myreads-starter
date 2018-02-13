import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Reading from './Components/Reading';
import WantToRead from './Components/WantToRead';
import Read from './Components/Read';
import SearchPage from './Components/SearchPage';
import * as BooksAPI from './Api/BooksAPI';
import './App.css';

/*I decided to split main page in three components, Reading, WantToRead and Read, creating content for each component and handle them by react state*/
class BooksApp extends Component {
  state = {
    booksInventory: [],
    booksReading: [],
    booksToRead: [],
    booksRead: [],
    searchResult: []
  };

  //API call before main page components are rendered
  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({booksInventory: books});
      this.organizeShelves();
    });
  }

  /*This method will filter books stored already in the shelves according to its shelf value, Reading, WantToRead or Read and save them in a separate array*/
  organizeShelves = () => {
    this.setState({booksReading: this.state.booksInventory.filter(book => book.shelf === 'currentlyReading')});
    this.setState({booksToRead: this.state.booksInventory.filter(book => book.shelf === 'wantToRead')});
    this.setState({booksRead: this.state.booksInventory.filter(book => book.shelf === 'read')});
  };

  /*This method processes repeated steps from moveToShelf, it was created to follow the rule don't repeat yourself. Its main purpose is to syncronize the state and changes of books that are already in main page and searchpage*/
  updateShelfControl = (bookItem, val, state) => {
    return state.map(book => {
      if(book.id === bookItem.id ){
        book.shelf = val;
      }
        return book;
    });
  };

  /*This method will handle shelf changes from both Main and Search Page, according to a third value "addBookToShelf" the method will know if the item is Book already in a shelf or a query from search page*/
  moveToShelf = (bookItem, val, addBookToShelf) => {
    if(addBookToShelf) {
      BooksAPI.update(bookItem, val).then(BooksAPI.getAll().then(books => {
        this.setState({booksInventory: books});
        this.organizeShelves();
      }));
      let searchFiltered = this.updateShelfControl(bookItem, val, this.state.searchResult);
      this.setState({searchResult: searchFiltered});
    } else {
      let books = this.updateShelfControl(bookItem, val, this.state.booksInventory);
      this.setState({booksInventory: books});
      this.organizeShelves();
      BooksAPI.update(bookItem, val);
    }
  };

  /*This method calls the books API to look for a book in the search page with at book.id and desired shelf value as parameters. Once the books are received, they are mapped to look for existence in main page*/
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
    );
  }
}

export default BooksApp;
