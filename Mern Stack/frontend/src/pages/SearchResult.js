import React, {useEffect, useState} from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import {useProjectsContext} from "../hooks/useProjectsContext";
import {useLocation} from 'react-router-dom'
import './SearchResult.css'
import UserSnapshot from "./components/project card/UserSnapshot";


const SearchResult = ({refresh}) => {

    const {projects, dispatch} = useProjectsContext()
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(true);
    const location = useLocation()

    const query = new URLSearchParams(location.search);
    const searchTags = query.get('tags') || 'NULL';
    const searchQuery = query.get('query') || 'NULL';

    useEffect(() => {
        const fetchResults = async () => {
            if (user) {
                setLoading(true);
                const response = await fetch(`/api/project/search/${searchTags}/${searchQuery}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_PROJECTS', payload: json });
                    setLoading(false);
                }
            }
        };

        if (user) {
            fetchResults().then(() => console.log("Projects fetched!"));
        }

    }, [user, refresh])


    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="search-result-view">
                    {projects && projects.length > 0 ? (
                        projects.map((project, i) => (
                            <div className="search-items-container" key={i}>
                                <UserSnapshot userId={project.user_id}/>
                                <div key={project._id}>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="projectTags">
                                        {project.tags.map((tag, index) => (
                                            <span key={index} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <button className="search-item-chat-button">Interested?</button>
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}
        </>
    )
}


export default SearchResult
