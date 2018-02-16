import React from 'react';

function SearchItem(props) {

    /*This method sends to its parent component(search Page) the book Item that was clicked and in which shelf needs to be allocated in main page*/
    const moveToShelf = (bookItem, val) => {
        props.moveToShelf(bookItem, val);
    };

    /*If books in search page are already in one shelf, the shelf name will be saved in value and rendered, otherwise the default value is none*/
    let value;
    props.book.shelf ? value = props.book.shelf : value = 'none';

    /*SearchItem will be rendered taking props values(thumbnail, title, authors, etc) from its parent component (searchPage)*/
    const { title, authors, imageLinks } = props.book;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover">
                        <img src={imageLinks.thumbnail} alt="thumbnail"/>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={value} onChange={e => moveToShelf(props.book, e.target.value)}>
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

export default SearchItem;