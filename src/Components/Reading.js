import React from 'react';
import BookItem from './BookItem';

function Reading(props) {

    /*This method receives from its child(Book Item) and sends to its parent component(App) the book Item that was clicked in Reading shelf and in which shelf wants to be moved inside main page.*/
    const moveToShelf = (bookItem, val) => {
        props.moveToShelf(bookItem, val);
    };

    /*If there are books in BooksReading array, they are mapped to create a component list to render in Reading shelf. The properties passed by App component parent will be passed to its child component BookItem*/
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