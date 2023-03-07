import styles from "./search.css";
import { useState } from 'react';

const Search = ({ }) => {
    const [search, setSearch] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Navigate to projectsearchres.js page
        console.log(search);
        window.location.href = `/projectsearchres?search=${search}`;
        
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="search-container">
                <div className="Icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>

                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input
                    type="text"
                    className="search"
                    placeholder="Search Projects by Tag/Keywords"
                    onChange={({ currentTarget: input }) => setSearch(input.value)}
                />
                <button type="submit">Search</button>
            </div>
        </form>
    );
};

export default Search;

