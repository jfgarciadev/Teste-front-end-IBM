import { useState, useEffect } from 'react';

function SearchBar() {
      const [search, setSearch] = useState('');

      const searchHandler = () => {

            console.log(search);
      }

      return (
            <div>
                  <input type="text" placeholder="Search..." onChange={ e => {
                        setSearch(e.target.value);
                  }} />
                  <button onClick={() => {
                        searchHandler();
                  }}>Search</button>
            </div>


      );
}

export default SearchBar;
