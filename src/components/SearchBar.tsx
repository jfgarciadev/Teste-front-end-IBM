import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SearchBar() {
      const [search, setSearch] = useState('');
      const navigate = useNavigate()

      const searchHandler = () => {
            navigate({
                  pathname: '/search',
                  search: '?q=' + search
            })
            window.location.reload();
      }

      return (
            <div>
                  <input type="text" placeholder="Search..." onChange={e => {
                        setSearch(e.target.value);
                  }} />
                  <button onClick={() => {
                        searchHandler();
                  }}>Search</button>
            </div>


      );
}

export default SearchBar;
