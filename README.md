#  Final assessment project for Udacity's React Fundamentals course

## MyReads: A Book Tracking App

Objective: Create a bookshelf app with React library that allows you to select and categorize books you have read, are currently reading, or want to read. The project must emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

Fulfill the below creteria using React library.

+ The application is created with create-react-app and requires only npm install and npm start to get it installed and launched.

+ An updated README that describes the project and has instructions for installing and launching the project is included.

+ The main page shows 3 shelves for books, and each book is shown on the correct shelf.

+ The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly.

+ When the browser is refreshed, the same information is displayed on the page.

+ The search page have a search input that lets users search for books.

+ Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.

+ When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page.

+ The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.

+ The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.

+ Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly.

+ Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.

+ All JSX code is formatted properly and functional.


## To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`


## Backend Server

To simplify development process, a backend server is provided to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Contribution

Pull Requests to fix a bug or enhance this project are welcome. Please follow [these steps](CONTRIBUTING.md) to contribute.

## License

[Licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.](https://creativecommons.org/licenses/by-sa/4.0/)

