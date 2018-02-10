import React from 'react';
import BookItem from './BookItem';

function Read(props) {

    const moveToShelf = (id, shelf, value) => {
        props.moveToShelf(id, shelf, value);
    };

    let booksList;
    if(props.cover) {
        booksList = props.cover.map((book) => <BookItem key={book.id} book={book} moveToShelf={moveToShelf}/>);
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