import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import useQuery from '../hooks/queryHook';
import { default as Books } from '../services/books';
import styles from './MyBooks.module.scss';
import Book from '../components/Book';
import SearchBar from '../components/SearchBar';

function MyBooks() {
    //get favorites from localStorage on api call to get books
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = () => {

        const favoriteString: any = Books.getFavoriteBooks() ? Books.getFavoriteBooks() : '[]';
        const favoriteBooks: [] = JSON.parse(favoriteString);
        console.log('favoriteBooks -> ', favoriteBooks);
        if (favoriteBooks.length > 0) {
            favoriteBooks.forEach( (book: any) => {
                console.log('book -> ', book);
                const bookFromApi =  Books.getBook(book).then((res: any) => {
                    console.log('bookFromApi -> ', res);
                    // @ts-ignore
                    setBooks(prevBooks => [...prevBooks, res.data]);
                });
            });

        }
    };

    


    return (
        <div className={styles.search}>
            <Link to="/">
                <h1 className={styles.LogoText}>Only <span>Free</span> . books</h1>
            </Link>
            <div className={styles.header}>
                <h1>
                    My Favorite Books
                </h1>
                <div className={styles.SearchBar} >
                    <SearchBar />
                </div>

            </div>
            {
                books.length > 0 ? books.map((book: any) => {
                    return (

                        <Book book={book} key={book.id} styles={styles} />


                    )
                }) : 'NOTHING TO SHOW'
            }

        </div>
    );
}

export default MyBooks;
