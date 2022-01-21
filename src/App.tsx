import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {default as books} from './services/books';
import { Routes, Route, Link } from "react-router-dom";
import Search from './screens/Search';
import Home  from './screens/Home';
import Book  from './screens/Book';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/book" element={ <Book /> } />
      </Routes> 
    </div>
  );
}

export default App;
