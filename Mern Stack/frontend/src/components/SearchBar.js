import "./SearchBar.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const languageOptions = ['Python', 'C++', 'Java', 'JavaScript', 'C', 'HTML/CSS', 'PHP', 'SQL', 'Swift', 'Go'];
const projectTypeOptions = [
    'Front-end', 'Back-end', 'Full-stack', 'React', 'Flask', "Rest", 'Machine Learning',
    'Data Analysis', 'Smart Devices', 'Artificial Intelligence', 'Social Network', 'Visualization',
];
const courseNumberOptions = [
    'CS1101', 'CS2201', 'CS2212', 'CS3250', 'CS3251', 'CS3281', 'CS3270', 'CS4278', 'CS3265', 'CS4260', 'CS4288', 'CS3891'
];

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const location = useLocation();
    const [selectedTags, setSelectedTags] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleSubmit = () => {
        const tagsString = selectedTags.join(',');
        const searchStr = `${tagsString}/${searchQuery}`;

        if (searchStr.trim() === '' && selectedTags.length === 0) {
            window.location.href = `/projectsearchres?search=NULL/NULL`;
        } else if (searchStr.trim() === '') {
            window.location.href = `/projectsearchres?search=${tagsString}/NULL`;
        } else if (selectedTags.length === 0) {
            window.location.href = `/projectsearchres?search=NULL/${searchStr}`;
        } else {
            window.location.href = `/projectsearchres?search=${encodeURIComponent(searchStr)}`;
        }
    };

    const handleTagSelect = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        } else {
            handleTagRemove(tag);
        }
    };

    const handleTagRemove = (tag) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

    if (location.pathname === '/profile') {
        return null;
    }

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
                {!dropdownVisible && (<button onClick={() => setDropdownVisible(true)} className="dropdown-toggle-and-submit-button">
                    Change Tags {selectedTags.length > 0 && <span className="tag-count-bubble">{selectedTags.length}</span>}
                </button>)}
                <button onClick={handleSubmit} className="dropdown-toggle-and-submit-button">
                    Search
                </button>
            </div>

            {dropdownVisible && <div className="overlay" onClick={() => setDropdownVisible(false)}></div>}


            {dropdownVisible && (
                <div className="dropdown-menu">
                    <div>
                        <h4>Languages</h4>
                        {languageOptions.map((lang) => (
                            <div key={lang}
                                 className={`dropdown-item ${selectedTags.includes(lang) ? 'selected' : ''}`}
                                 onClick={() => handleTagSelect(lang)}>
                                {lang}
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4>Project Types</h4>
                        {projectTypeOptions.map((type) => (
                            <div key={type}
                                 className={`dropdown-item ${selectedTags.includes(type) ? 'selected' : ''}`}
                                 onClick={() => handleTagSelect(type)}>
                                {type}
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4>Course Numbers</h4>
                        {courseNumberOptions.map((course) => (
                            <div key={course}
                                 className={`dropdown-item ${selectedTags.includes(course) ? 'selected' : ''}`}
                                 onClick={() => handleTagSelect(course)}>
                                {course}
                            </div>
                        ))}
                    </div>
                    <button className="close-dropdown" onClick={() => setDropdownVisible(false)}>Okay</button>

                </div>
            )}
        </div>
    );
};

export default SearchBar;
