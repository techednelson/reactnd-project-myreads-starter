import React from 'react';
import BookItem from './BookItem';

function Reading(props) {

    let booksList;
    if(props.cover) {
        booksList = props.cover.map((book,i) => <BookItem key={i} book={book} />);
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