import React, { Component } from 'react';
import BookItem from './BookItem';

function WantToRead(props) {

    let booksList;
    if(this.props.cover) {
        booksList = this.props.cover.map((book,i) => <BookItem key={i} book={book} />);
    }
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksList}
                </ol>
            </div>
        </div>
    );
}

export default WantToRead;