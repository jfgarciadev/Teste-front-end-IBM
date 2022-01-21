import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import useQuery from '../hooks/queryHook';
import { default as Books } from '../services/books';
import styles from './Search.module.scss';
import Book from '../components/Book';
import SearchBar from '../components/SearchBar';

function Search() {
    const search = useQuery('q');
    const page: any = useQuery('page');
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [pages, setPages] = useState([0]);
    const [totalItems, setTotalItems] = useState(0);



    const getBooks = (search: any, page: any) => {
        console.log(' search ->  ', search);
        if (search !== '') {
            const books = Books.searchBooks(search, page * 20, 20);
            return books;
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        const pageForSearch = page ? page : 0;
        getBooks(search, page)?.then((res: any) => {
            setBooks(res.data.items);

            console.log('set selected page -> ', pageForSearch);
            const pagesQuantity = calcPagesQuantity(res.data.totalItems, res.data.items.length);
            setPages(generatePagination(pagesQuantity, pageForSearch));


        });


    }, [])




    const calcPagesQuantity = (totalItems: number, itemsPerPage: number) => {
        console.log('totalItems -> ', totalItems);
        console.log('itemsPerPage -> ', itemsPerPage);
        const pages = Math.ceil(totalItems / itemsPerPage);
        console.log('pages -> ', pages);
        return pages;
    };

    //generate pagination
    const generatePagination = (pagesQuantity: number, selectedPage: any) => {
        //limit pagination to 4 pages after and before selected page
        const pagination = [];
        var startPage = parseInt(selectedPage) - 4;
        var endPage = 5 + parseInt(selectedPage);
        if (startPage < 0) {
            startPage = 0;
        }
        if (endPage > pagesQuantity) {
            endPage = pagesQuantity;
        }
        console.log('startPage -> ', startPage);
        console.log('endPage -> ', endPage);
        pagination.push(0);
        for (let i = startPage; i < endPage; i++) {
            if (i != selectedPage && i != 0 && i != pagesQuantity) {
                pagination.push(i);
            }

        }

        pagination.push(pagesQuantity);
        return pagination;



    };

    return (
        <div className={styles.search}>
            <Link to="/">
            <h1 className={styles.LogoText}>Only <span>Free</span> . books</h1>
            </Link>
            <div className={styles.header}>
                <h1>
                    Search results for: <span>{search}</span>
                </h1>
                <div className={styles.SearchBar} >
                    <SearchBar />
                </div>

            </div>
            {
                books.map((book: any) => {
                    return (

                        <Book book={book} key={book.id} styles={styles} />


                    )
                })
            }
            <div>
                {pages.map((page: any) => {
                    return (
                        <button className={styles.pageButton} key={
                            page
                        } onClick={() => {
                            navigate('/search?q=' + search + '&page=' + page);
                            window.location.reload();
                        }}>{page}</button>

                    )
                })}
            </div>
        </div>
    );
}

export default Search;
