// import styles from "./search.css";
// import { useState } from 'react';

// const Search = ({ }) => {
//     const [search, setSearch] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         // Navigate to projectsearchres.js page
//         console.log(search);
//         window.location.href = `/projectsearchres?search=${search}`;
        
//     }

//     return (
//         <form className="create" onSubmit={handleSubmit}>
//             <div className="search-container">
//                 <div className="Icon">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>

//                         <circle cx="11" cy="11" r="8"></circle>
//                         <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//                     </svg>
//                 </div>
//                 <input
//                     type="text"
//                     className="search"
//                     placeholder="Search Projects by Tag/Keywords"
//                     onChange={({ currentTarget: input }) => setSearch(input.value)}
//                 />
//                 <button type="submit">Search</button>
//             </div>
//         </form>
//     );
// };

// export default Search;

import styles from "./search.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    
    const searchQuery = new URLSearchParams(location.search).get('search') || 'NULL/NULL';
    const [selectedTags, setSelectedTags] = useState(searchQuery.split('/')[0].split(', ').filter(tag => tag !== 'NULL'));
    const [textInput, setTextInput] = useState(searchQuery.split('/')[1] !== 'NULL' ? searchQuery.split('/')[1] : '');
    const tagOptions = ['Python', 'C++', 'Java', 'Machine Learning', 'data analysis', 'smart devices', 'social network'];

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Combine the selected tags into a single string separated by commas
        const tagsString = selectedTags.join(', ');
    
        // Create the search query using the new format
        const searchQuery = `${tagsString}/${textInput}`;
    
        console.log(searchQuery);
    
        // Check if both textInput and selectedTags are empty
        if (textInput.trim() === '' && selectedTags.length === 0) {
            window.location.href = `/projectsearchres?search=NULL/NULL`; // Redirect with the desired search query
        } else if (textInput.trim() === ''){
            window.location.href = `/projectsearchres?search=${tagsString}/NULL`
        } else if (selectedTags.length === 0){
            window.location.href = `/projectsearchres?search=NULL/${textInput}`
        } else {
            window.location.href = `/projectsearchres?search=${encodeURIComponent(searchQuery)}`;
        }
    };
    
    
    

    const handleTagSelect = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const handleTagRemove = (tag) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    }

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="search-container">
                <div className="tags-container">
                <div className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        </div>
                    {selectedTags.map((tag) => (
                        <div key={tag} className="tag-box" onClick={() => handleTagRemove(tag)}>
                            {tag}
                            <button type="button">x</button>
                        </div>
                    ))}
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Search Projects with Keywords"
                        value={textInput}
                        onChange={({ currentTarget: input }) => {
                            setTextInput(input.value);
                        }}
                    />
                </div>
                <button type="button" className="advanced-search-btn" onClick={toggleDropdown}>
                    Select Tags
                </button>
                {dropdownVisible && (
                    <div className="dropdown-container">
                        {tagOptions.map((tag) => (
                            <div key={tag} className="tag-option" onClick={() => handleTagSelect(tag)}>
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
                <button type="submit">Search</button>
            </div>
            {/* <div className="tag-options-container">
                {tagOptions.map((tag) => (
                    <div key={tag} className="tag-option" onClick={() => handleTagSelect(tag)}>
                        {tag}
                    </div>
                ))}
            </div> */}
        </form>
    );
};

export default Search;