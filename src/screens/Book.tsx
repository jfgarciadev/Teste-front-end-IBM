//a screen to show a single book and its details from google books api
import { useEffect, useState } from 'react';
import useQuery from '../hooks/queryHook';
import { default as Books } from '../services/books';
import styles from './Book.module.scss';
import { Link } from "react-router-dom";
import { verify } from 'crypto';

function Book() {
    const id: any = useQuery('id');
    const [book, setBook] = useState<any>({});
    useEffect(() => {
        Books.getBook(id)?.then((res: any) => {
            setBook(res.data);
        });
    }, []);
    const formatDate = (date: any) => {

        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        //verify if is not a number
        if (isNaN(d.getTime())) {
            return date;
        } else {
            return `${day}/${month}/${year}`;
        }
    };

    const isFavorite = (id: string) => {
        const favoriteString: any = Books.getFavoriteBooks() ? Books.getFavoriteBooks() : '[]';
        const favoriteBooks: any = JSON.parse(favoriteString);
        if (favoriteBooks) {
            console.log('favoriteBooks -> ', id);
            console.log('favoriteBooks -> ', favoriteBooks);
            console.log('favoriteBooks -> ', favoriteBooks.find((fav: any) => fav.id === id) ? true : false);
            return isInArray(favoriteBooks, id);
        }
    };

    const isInArray = (array: any, id: string) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == id) {
                console.log('true');
                return true;
            }
        }
        return false;
    };

    return (
        <div className={styles.book}>
            <Link to="/">
                <h1 className={styles.LogoText}>Only <span>Free</span> . books</h1>
            </Link>
            <h1>{book.volumeInfo?.title}</h1>
            <img src={book.volumeInfo?.imageLinks.thumbnail} alt="" />
            <p> Author: {book.volumeInfo?.authors}</p>
            <p>{book.volumeInfo?.description}</p>
            <p>Pages: {book.volumeInfo?.pageCount}</p>
            <p>Published: {formatDate(book.volumeInfo?.publishedDate)}</p>
            <div className="row">
                <button className={styles.button} onClick={() => {
                    if (isFavorite(book.id)) {
                        Books.deleteFavoriteBooks(book.id);
                    } else {
                        Books.saveFavoriteBooks(book);
                    }
                    window.location.reload();
                }}>{isFavorite(id) ? 'Delete from my books' : 'Add to my books'}</button>
                <button className={styles.button} onClick={() => {
                    window.open(book.accessInfo.webReaderLink, '_blank');
                }}>Read</button>
            </div>
        </div>
    );
}

export default Book;
