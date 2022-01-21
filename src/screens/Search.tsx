import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import { default as Books } from '../services/books';
function Search() {
    const location = useLocation().search;
    const search = new URLSearchParams(location).get('q');
    const navigate = useNavigate();
    const getBooks = async (search: any) => {
        console.log(' search ->  ',  search);
        if(search !== null) {
            const books = await Books.searchBooks(search)
            return books;
        }else{
            navigate('/');
        }

    };
    useEffect(() => {
        getBooks(search).then(books => console.log(books));
        
    }, []);

    return (
        <div >

        </div>
    );
}

export default Search;
