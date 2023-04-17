// export default Search;
import "./search.css";

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const languageOptions = ['Python', 'C++', 'Java', 'JavaScript', 'C', 'HTML/CSS', 'PHP', 'SQL', 'Swift', 'Go', ];
const projectTypeOptions = [
  'Front-end',
  'Back-end',
  'Full-stack',
  'React',
  'Flask',
  "Rest",
  'Machine Learning',
  'Data Analysis',
  'Smart Devices',
  'Artificial Intelligence',
  'Social Network',
  'Visualization',
];
const courseNumberOptions = ['CS1101', 'CS2201', 'CS2212', 'CS3250', 'CS3251', 'CS3281', 'CS3270','CS4278', 'CS3265', 'CS4260', 'CS4288','CS3891'];


const Search = () => {
    const location = useLocation();
    
    const searchQuery = new URLSearchParams(location.search).get('search') || 'NULL/NULL';
    const [selectedTags, setSelectedTags] = useState(searchQuery.split('/')[0].split(',').filter(tag => tag !== 'NULL'));
    const [textInput, setTextInput] = useState(searchQuery.split('/')[1] !== 'NULL' ? searchQuery.split('/')[1] : '');
    const tagOptions = ['Python', 'C++', 'Java', 'JavaScript', 'C',
                        'Front-end', 'Back-end', 'Full-stack',
                        'Machine Learning', 'Data Analysis', 'Smart Devices', 'Artificial Intelligence',
                        'Social Network', 'Visualization'];

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Combine the selected tags into a single string separated by commas
        const tagsString = selectedTags.join(',');
    
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
    <div className="dropdown-subcategory">
      <h4>Languages</h4>
      {languageOptions.map((tag) => (
        <div key={tag} className="tag-option" onClick={() => handleTagSelect(tag)}>
          {tag}
        </div>
      ))}
    </div>
    <div className="dropdown-subcategory">
      <h4>Project Type</h4>
      {projectTypeOptions.map((tag) => (
        <div key={tag} className="tag-option" onClick={() => handleTagSelect(tag)}>
          {tag}
        </div>
      ))}
    </div>
    <div className="dropdown-subcategory">
      <h4>Course Number</h4>
      {courseNumberOptions.map((tag) => (
        <div key={tag} className="tag-option" onClick={() => handleTagSelect(tag)}>
          {tag}
        </div>
      ))}
    </div>
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