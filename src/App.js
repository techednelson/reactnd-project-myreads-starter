import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './Components/BookShelf';
import ListBooksTitle from './Components/ListBooksTitle';
import OpenSearch from './Components/OpenSearch'
import SearchPage from './Components/SearchPage';
import * as BooksAPI from './Api/BooksAPI';
import './App.css';

/* Main page is splitted in three components, ListBooksTitle, ListBooks and OpenSearch with one child, BookItem while SearchPage has one component, itself and one child, SearchItem, books got from API are filtered by shelf category and rendered by ListBooks component */
class BooksApp extends Component {
  state = {
    books: [],
    searchResult: []
  };

  //API call before main page components are rendered
  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  }

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
        this.setState({books: books});
      }));
      let searchFiltered = this.updateShelfControl(bookItem, val, this.state.searchResult);
      this.setState({searchResult: searchFiltered});
    } else {
      let books = this.updateShelfControl(bookItem, val, this.state.books);
      this.setState({booksInventory: books});
      BooksAPI.update(bookItem, val);
    }
  };

  /*This method calls the books API to look for a book in the search page with at book.id and desired shelf value as parameters. Once the books are received, they are mapped to look for existence in main page*/
  searchTitle = (search) => {
    BooksAPI.search(search).then(books => {
      let filtered = books.map(book => {
        for(const element of this.state.books) {
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
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead');
    const read = this.state.books.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <ListBooksTitle />
            <BookShelf books={currentlyReading} title="currentlyReading" moveToShelf={this.moveToShelf}/>
            <BookShelf books={wantToRead} title="want to Read" moveToShelf={this.moveToShelf} />
            <BookShelf books={read} title="Read" moveToShelf={this.moveToShelf} />
            <OpenSearch />
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
