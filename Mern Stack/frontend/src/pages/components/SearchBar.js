import "./SearchBar.css";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TagDropdown from './TagDropdown';

const SearchBar = ({ setRefresh, refresh }) => {
    const location = useLocation();
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    if (location.pathname.includes('/homepage') || location.pathname.includes('/search')) {
        const handleSubmit = () => {
            const tagsString = selectedTags.join(',');
            const params = new URLSearchParams();

            if (tagsString.trim() !== '') {
                params.set('tags', tagsString);
            }

            if (searchQuery.trim() !== '') {
                params.set('query', searchQuery);
            }

            const searchParams = params.toString() || 'tags=NULL&query=NULL';
            navigate(`/search?${searchParams}`);
            setRefresh(!refresh);
        };

        return (
            <div className="search-bar-view">
                <div className="search-bar-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="#657789" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        className="search-bar-text-input"
                        placeholder="Search Projects with Keywords"
                        value={searchQuery}
                        onChange={({ currentTarget: input }) => {
                            setSearchQuery(input.value);
                        }}
                    />
                    <TagDropdown selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    <button onClick={handleSubmit} className="dropdown-toggle-and-search-button">
                        Search
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default SearchBar;
