import React, { createContext, useState, useEffect } from 'react';
import useFetchTag from '../hooks/useFetchTag';

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
    const [programmingLanguage, setProgrammingLanguage] = useState([]);
    const [projectType, setProjectType] = useState([]);
    const [VUCourse, setVUCourse] = useState([]);

    const { tags: fetchedProgrammingLanguage, loading: loadingLanguage } = useFetchTag('programmingLanguage');
    const { tags: fetchedProjectType, loading: loadingProjectType } = useFetchTag('projectType');
    const { tags: fetchedVUCourse, loading: loadingCourseNumber } = useFetchTag('VUCourse');


    useEffect(() => {
        if (!loadingLanguage) setProgrammingLanguage(fetchedProgrammingLanguage);
    }, [fetchedProgrammingLanguage, loadingLanguage]);

    useEffect(() => {
        if (!loadingProjectType) setProjectType(fetchedProjectType);
    }, [fetchedProjectType, loadingProjectType]);

    useEffect(() => {
        if (!loadingCourseNumber) setVUCourse(fetchedVUCourse);
    }, [fetchedVUCourse, loadingCourseNumber]);

    return (
        <TagContext.Provider value={{ programmingLanguage, projectType, VUCourse }}>
            {children}
        </TagContext.Provider>
    );
};
