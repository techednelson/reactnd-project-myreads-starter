import React from 'react';

function BookItem(props) {

    /*This method sends to its parent component BookList the book Item that was clicked and in which shelf needs to be allocated in main page*/
    const moveToShelf = (bookItem, val) => {
        props.moveToShelf(bookItem, val);
    };

    /*Props are received by BookList parent in order to render books properties(thumbnails, title, auhtors, etc.)*/
    const { title, authors, imageLinks, shelf } = props.book;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover">
                        <img src={imageLinks.thumbnail} alt="thumbnail"/>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={e => moveToShelf(props.book, e.target.value)}>
                        <option disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    );
}

export default BookItem;