import React from 'react';
import BookItem from './BookItem';

const BookShelf = props => {

    /*This method receives from its child(Book Item) and sends to its parent component(App) the book Item that was clicked in Reading shelf and in which shelf wants to be moved inside main page.*/
    const moveToShelf = (bookItem, shelf) => {
        props.moveToShelf(bookItem, shelf);
    };

    const { books, title } = props;
    return (
        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => <BookItem key={book.id} book={book} moveToShelf={moveToShelf}/>)}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default BookShelf;