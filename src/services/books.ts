import axios from 'axios';

export default {
    searchBooks: function (query: string, offset: number = 0, limit: number = 20) {
        
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&filter=full&offset=${offset}`);
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
        let favoriteBooks: any = localStorage.getItem("favoriteBooks");
        console.log(favoriteBooks);
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

    },
    deleteFavoriteBooks: function (bookToDelete: any) {
        console.log(bookToDelete);
        let favoriteBooks: any = localStorage.getItem("favoriteBooks");
        favoriteBooks = JSON.parse(favoriteBooks);
        let index = favoriteBooks.indexOf(bookToDelete);
        if (index > -1) {
            favoriteBooks.splice(index, 1);
            localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
        }

    }
};
