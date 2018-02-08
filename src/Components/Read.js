import React, { Component } from 'react';
import BookItem from './BookItem';

function Read(props) {

    let booksList;
    if(props.cover) {
        booksList = props.cover.map((book,i) => <BookItem key={i} book={book} />);
    }
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksList}
                </ol>
            </div>
        </div>
    );
}

export default Read;