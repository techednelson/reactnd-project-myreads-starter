import React from 'react';
import BookItem from './BookItem';

function Reading(props) {
    
    const moveToShelf = (bookItem, value) => {
        props.moveToShelf(bookItem, value);
    };

    let booksList;
    if(props.cover) {
        booksList = props.cover.map((book) => <BookItem key={book.id} book={book} moveToShelf={moveToShelf}/>);
    }
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksList}
                </ol>
            </div>
        </div>
    );
}

export default Reading;