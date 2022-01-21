import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {default as books} from './services/books';
import { Routes, Route, Link } from "react-router-dom";

import Home  from './screens/Home';

function App() {

  useEffect(() => {
    books.getBooks().then(console.log);
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
      </Routes> 
    </div>
  );
}

export default App;
