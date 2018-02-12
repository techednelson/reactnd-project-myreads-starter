import React from 'react';

function SearchItem(props) {

    const moveToShelf = (bookItem, val) => {
        props.moveToShelf(bookItem, val);
    };

    let value;
    if(props.book.shelf) {
        value = props.book.shelf;
    } else {
    value = 'none';
    }
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193 }}>
                        <img src={props.book.imageLinks.thumbnail} alt="thumbnail" style={{width: 128, height: 193}}/>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={value} onChange={(e) => moveToShelf(props.book, e.target.value)}>
                        <option disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors}</div>
            </div>                    
        </li>                
    );    
}

export default SearchItem;