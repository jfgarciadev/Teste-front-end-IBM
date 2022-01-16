import axios from 'axios';
//import localStorage

export default {
    searchBooks: function (query: string ) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`);	
    },
    getBook: function (id:number ) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    },
    getBooks: function () {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=javascript&filter=full&printType=books");
    },
    getFavoriteBooks: function () {
        localStorage.getItem("favoriteBooks");
    },
    saveFavoriteBooks: function (bookToSave: any) {
        let books = JSON.parse(localStorage.getItem('currentUser') || '[]');

        if (books.find((book: any) => book.id === bookToSave.id)) {
            return;
        }
        books.push(bookToSave);
        localStorage.setItem("favoriteBooks", books);
    },
    deleteFavoriteBooks: function (bookToDelete: any) {
        let books = JSON.parse(localStorage.getItem('currentUser') || '[]');
        if (books === null) {
            books = [];
        }
        if (books.find( (book: any) => book.id === bookToDelete.id)) {
            books.splice(bookToDelete, 1);
        }
        localStorage.setItem("favoriteBooks", books);
    }
};
