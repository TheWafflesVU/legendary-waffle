import React, {useContext, useState} from 'react';
import {TagContext} from "../../context/TagContext";
import './TagDropdown.css';

const TagDropdown = ({ selectedTags, setSelectedTags }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const { programmingLanguage, projectType, VUCourse } = useContext(TagContext);

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

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <>
            <button type="button" onClick={toggleDropdown} className="dropdown-toggle-and-search-button">
                Change Tags {selectedTags.length > 0 && <span className="tag-count-bubble">{selectedTags.length}</span>}
            </button>

            {dropdownVisible && (
                <>
                    <div className="overlay" onClick={toggleDropdown}></div>
                    <div className="dropdown-menu">
                        <div>
                            <h4>Languages</h4>
                            {programmingLanguage && programmingLanguage.map((lang) => (
                                <div key={lang}
                                     className={`dropdown-item ${selectedTags.includes(lang) ? 'selected' : ''}`}
                                     onClick={() => handleTagSelect(lang)}>
                                    {lang}
                                </div>
                            ))}
                        </div>

                        <div>
                            <h4>Project Types</h4>
                            {projectType && projectType.map((type) => (
                                <div key={type}
                                     className={`dropdown-item ${selectedTags.includes(type) ? 'selected' : ''}`}
                                     onClick={() => handleTagSelect(type)}>
                                    {type}
                                </div>
                            ))}
                        </div>

                        <div>
                            <h4>Course Numbers</h4>
                            {VUCourse && VUCourse.map((course) => (
                                <div key={course}
                                     className={`dropdown-item ${selectedTags.includes(course) ? 'selected' : ''}`}
                                     onClick={() => handleTagSelect(course)}>
                                    {course}
                                </div>
                            ))}
                        </div>
                        <button className="close-dropdown" onClick={toggleDropdown}>Okay</button>
                    </div>
                </>
            )}
        </>
    );
};

export default TagDropdown;
