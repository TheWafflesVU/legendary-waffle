import React from 'react';
import './ProjectDetails.css';

const ProjectDetails = ({ project, canDelete, onDelete }) => {
    return (
        <div className="projectDetails">
            <h2 className="projectTitle">{project.title}</h2>
            <p className="projectTeammates"># Developers: {project.num_teammates} </p>
            <hr/>
            <p className="projectDescription">{project.description}</p>
            <div className="projectTags">
                {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
            {canDelete && (
                <button className="deleteButton" onClick={() => onDelete(project._id)}>Delete</button>
            )}
        </div>
    );
};

export default ProjectDetails;
