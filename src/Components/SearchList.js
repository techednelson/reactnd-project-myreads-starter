import React from 'react';
import BookItem from './BookItem';

function SearchList(props) {
    
    let searchList;
    if(props.searchResult) {
        searchList = props.searchResult.map((book) => <BookItem key={book.id} book={book}/>);
    }
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {searchList}
            </ol>
        </div>
    );
}

export default SearchList;