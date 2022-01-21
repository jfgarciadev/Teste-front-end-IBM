//a screen to show a single book and its details from google books api
import { useEffect, useState } from 'react';
import useQuery from '../hooks/queryHook';
import { default as Books } from '../services/books';

function Book() {
  const id: any = useQuery('id');
    const [book, setBook] = useState<any>({});
  useEffect(() => {
    Books.getBook(id)?.then( (res : any) => {
        setBook(res.data);
        
    });
    }, []);
    const formatDate = (date: any) => {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
  return (
    <div>
        <h1>{book.volumeInfo?.title}</h1>
        <img src={book.volumeInfo?.imageLinks.thumbnail} alt="" />
        <p> Author: {book.volumeInfo?.authors}</p>
        <p>{book.volumeInfo?.description}</p>
        <p>Pages: {book.volumeInfo?.pageCount}</p>
        <p>Published: {formatDate(book.volumeInfo?.publishedDate)}</p>
        <div className="row">
            <button className="button">Add to my books</button>
            <button className="button">Read</button>
            <button className="button">More info</button>
        
        </div>

        
    </div>

  );
}

export default Book;
 