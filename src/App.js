import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Reading from './Components/Reading';
import WantToRead from './Components/WantToRead';
import Read from './Components/Read';
import SearchPage from './SearchPage';
import * as BooksAPI from './Api/BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    booksInventory: [],
    booksReading: [],
    booksToRead: [],
    booksRead: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({booksInventory: books});
      this.organizeShelfs();
    });
  }

  organizeShelfs = () => {
    this.setState({booksReading: this.state.booksInventory.filter(book => book.shelf === "currentlyReading")});
    this.setState({booksToRead: this.state.booksInventory.filter(book => book.shelf === "wantToRead")});
    this.setState({booksRead: this.state.booksInventory.filter(book => book.shelf === "read")});
  };

  moveToShelf = (bookItem, value) => {
    let books = this.state.booksInventory
    books.map(book => {
      if(book.id === bookItem.id ){
        book.shelf = value;
      }
    });
    this.setState({booksInventory: books});
    this.organizeShelfs();
  }

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
        <Route path="/search" component={SearchPage}/>
      </div>
    )
  }
}

export default BooksApp
