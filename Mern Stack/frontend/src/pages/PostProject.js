import React, { useState, useEffect } from "react";
import './PostProject.css';
import { useAuthContext } from "../hooks/useAuthContext";
import TagDropdown from "./components/TagDropdown";
import ProjectDetails from "./components/project card/ProjectDetails";

const PostProject = () => {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("Welcome to my project!");
    const [num_teammates, setNum_teammates] = useState(2);

    const { user } = useAuthContext();

    useEffect(() => {
        if (user) {
            // Fetch existing projects from the backend
            const fetchProjects = async () => {
                const response = await fetch(`/api/project/byUser/${user.user_id}`, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    }
                });
                const data = await response.json();
                setProjects(data);
            };

            fetchProjects();
        }
    }, [user]);


    const handleAddProject = async (e) => {
        e.preventDefault();
        const newProject = {
            title,
            tags,
            num_teammates,
            description,
            email: user.email,
            user_id: user.user_id
        };

        const response = await fetch("/api/project/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(newProject),
        });

        if (response.ok) {
            const data = await response.json();
            setProjects([...projects, data]);
            // Clear the form
            setTitle("");
            setTags([]);
            setDescription("Welcome to my project!");
            setNum_teammates(2);
        }
    };


    return (
        <div className="post-project-container">
            <div className="projects-list">
                <h3>Existing Projects</h3>
                <ul>
                    {projects.map((project, i) => (
                        <div key={i}>
                            <ProjectDetails project={project} />
                        </div>
                    ))}
                </ul>
            </div>

            <div className="add-project-form">
                <h3>Add New Project</h3>
                <form onSubmit={handleAddProject}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="no-horizontal-resize"
                    ></textarea>
                    <label>Number of Teammates</label>
                    <input
                        type="number"
                        value={num_teammates}
                        onChange={(e) => setNum_teammates(e.target.value)}
                        required
                    />
                    <TagDropdown selectedTags={tags} setSelectedTags={setTags} />

                    <button type="submit">Add Project</button>
                </form>
            </div>
        </div>
    );
};

export default PostProject;
