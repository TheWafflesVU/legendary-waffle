import styles from "./search.css";
import { useState } from 'react';

const Search = () => {
    const [textInput, setTextInput] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const tagOptions = ['Python', 'C++', 'Java', 'Machine Learning', 'data analysis', 'smart devices'];

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Combine the selected tags and text input into a single search string
        const searchQuery = [...selectedTags, textInput].join('/');
    
        console.log(searchQuery);
        window.location.href = `/projectsearchres?search=${encodeURIComponent(searchQuery)}`;
    };
    

    const handleTagSelect = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const handleTagRemove = (tag) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="search-container">
                <div className="tags-container">
                    {selectedTags.map((tag) => (
                        <div key={tag} className="tag-box" onClick={() => handleTagRemove(tag)}>
                            {tag}
                            <button type="button">x</button>
                        </div>
                    ))}
                    <input
                        type="text"
                        className="text-input"
                        placeholder="Search Projects by Tag/Keywords"
                        value={textInput}
                        onChange={({ currentTarget: input }) => {
                            setTextInput(input.value);
                        }}
                    />
                </div>
                <button type="submit">Search</button>
            </div>
            <div className="tag-options-container">
                {tagOptions.map((tag) => (
                    <div key={tag} className="tag-option" onClick={() => handleTagSelect(tag)}>
                        {tag}
                    </div>
                ))}
            </div>
        </form>
    );
};

export default Search;
