import axios from 'axios';

export default {
    searchBooks: function (query: string, offset: number = 0, limit: number = 20) {
        
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&filter=full&printType=books&offset=${offset}`);
    },
    getBook: function (id:number ) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    },
    getBooks: function () {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=javascript&filter=full&printType=books");
    },
    getFavoriteBooks: function () {
        return localStorage.getItem("favoriteBooks");
    },
    saveFavoriteBooks: function (bookToSave: any) {
        //save book id to local storage if not already saved
        let favoriteBooks: any = localStorage.getItem("favoriteBooks");
        if (favoriteBooks) {
            favoriteBooks = JSON.parse(favoriteBooks);
            if (favoriteBooks.indexOf(bookToSave.id) === -1) {
                favoriteBooks.push(bookToSave.id);
                localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
            }
        } else {
            favoriteBooks = [];
            favoriteBooks.push(bookToSave.id);
            localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
        }

        /*
        console.log(bookToSave);
        let books = localStorage.getItem('currentUser') || [];
        console.log(books);
        if (books.find((book: any) => book.id === bookToSave.id)) {
            console.log("Book already exists");
            return;
        }else{
            console.log(books);
            console.log("Book does not exist");
            books.push(bookToSave.id);
            console.log(books);
            localStorage.setItem("favoriteBooks",JSON.stringify(books));
        }
        */
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
