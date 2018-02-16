import React from 'react';
import BookItem from './BookItem';

function BookList(props) {

    /*This method receives from its child(Book Item) and sends to its parent component(App) the book Item that was clicked in Reading shelf and in which shelf wants to be moved inside main page.*/
    const moveToShelf = (bookItem, val) => {
        props.moveToShelf(bookItem, val);
    };

    /*Books in BooksReading, BooksToRead and BooksRead arrays are mapped to create a component list to render in its corresponding shelf. The properties are passed from parent to child starting from App Component, passing to bookList and finally to BookItem component*/
    let readingList = props.reading.map((book) => <BookItem key={book.id} book={book} moveToShelf={moveToShelf}/>);
    let wantToReadList = props.wantToRead.map((book) => <BookItem key={book.id} book={book} moveToShelf={moveToShelf}/>);
    let readList = props.read.map((book) => <BookItem key={book.id} book={book} moveToShelf={moveToShelf}/>);

    return (
        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {readingList}
                    </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {wantToReadList}
                    </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {readList}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default BookList;