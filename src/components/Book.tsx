
import { useEffect } from 'react';
import { default as Books } from '../services/books';
import { useNavigate } from "react-router-dom";

function Book(props: any) {
    const book = props.book;
    const styles = props.styles;

    const navigate = useNavigate()

      const goToBook = (id: string) => {
            navigate({
                  pathname: '/book',
                  search: '?id=' + id
            })
      }

    const getDescription = (description: any) => {
        if (description) {
            if (description.length > 380) {
                return description.substring(0, 380) + '...';
            } else {
                return description;
            }
        }else{
            return 'No description available';
        }
    };

    return (
        <div className={styles.book}>
            <div className={styles.row}>
                {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt="" /> : <img src="https://via.placeholder.com/128x193.png?text=No+Image" alt="" />}
                <div className={styles.content}>
                    <h1>{book.volumeInfo.title}</h1>
                    <p>{getDescription(book.volumeInfo.description)}</p>
                    <div className={styles.row}>
                        <p><strong>Author: </strong>{book.volumeInfo.authors}</p>
                        <div>
                            <button className={styles.button} onClick={() => {
                                goToBook(book.id);
                            }}>More info</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>


    );
}

export default Book;


