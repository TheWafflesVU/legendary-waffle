import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import profileImage from './default.png';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [programmingLanguages, setProgrammingLanguages] = useState([]);
    const [socialInfo, setSocialInfo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const LANGUAGES = [
        'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'PHP', 'C#', 'TypeScript'
    ];

    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
            if (!token) {
                setIsLoading(false);
                setError('User is not authenticated');
                return;
            }
            try {
                const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user_id : null;
                const response = await fetch(`/api/user/${user_id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await response.json();

                if (!response.ok) {
                    setIsLoading(false);
                    setError(json.error);
                } else {
                    setFirstName(json.firstName || '');
                    setLastName(json.lastName || '');
                    setEmail(json.email || '');
                    setYear(json.year || '');
                    setProgrammingLanguages(json.programmingLanguages || []);
                    setSocialInfo(json.socialInfo || '');
                    setIsLoading(false);
                }
            } catch (e) {
                setIsLoading(false);
                setError(e.message);
            }
        };
        getProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        if (!token) {
            setError('User is not authenticated');
            setIsLoading(false);
            return;
        }
        try {
            const user_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user_id : null;
            const response = await fetch(`/api/user/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    year,
                    programmingLanguages,
                    socialInfo
                })
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
            } else {
                setIsLoading(false);
                setIsEditing(false);
            }

        } catch (e) {
            setError(e.message);
        }
    };

    const handleLanguageChange = (event) => {
        const { value, checked } = event.target;
        setProgrammingLanguages((prevLanguages) =>
            checked ? [...prevLanguages, value] : prevLanguages.filter((lang) => lang !== value)
        );
    };

    return (
        <div className="myprofile-container">
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
                <div className="myprofile-wrapper">
                    <img src={profileImage} alt="Your avatar" className="rounded-circle avatar" width="200" height="200" />
                    <div className="myprofile-info-container">
                        {isEditing ? (
                            <div>
                                <p className="myprofile-info">
                                    <label className="myprofile-info-label">Name:</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                    />
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                    />
                                </p>
                                <p className="myprofile-info">
                                    <label className="myprofile-info-label">Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </p>
                                <p className="myprofile-info">
                                    <label className="myprofile-info-label">Year:</label>
                                    <input
                                        type="text"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    />
                                </p>
                                <p className="myprofile-info">
                                    <label className="myprofile-info-label">Language(s):</label>
                                    {LANGUAGES.map((lang) => (
                                        <label key={lang}>
                                            <input
                                                type="checkbox"
                                                value={lang}
                                                checked={programmingLanguages.includes(lang)}
                                                onChange={handleLanguageChange}
                                            />
                                            {lang}
                                        </label>
                                    ))}
                                </p>
                                <p className="myprofile-info">
                                    <label className="myprofile-info-label">GitHub:</label>
                                    <input
                                        type="text"
                                        value={socialInfo}
                                        onChange={(e) => setSocialInfo(e.target.value)}
                                    />
                                </p>
                                <button className='myprofile-button' onClick={handleSaveProfile}>Save Profile</button>
                                <button className='myprofile-button' onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <p className="myprofile-info">
                                    <span className="myprofile-info-label">Name:</span>
                                    <span className="myprofile-info-value">{firstName} {lastName}</span>
                                </p>
                                <p className="myprofile-info">
                                    <span className="myprofile-info-label">Email:</span>
                                    <span className="myprofile-info-value">{email}</span>
                                </p>
                                <p className="myprofile-info">
                                    <span className="myprofile-info-label">Year:</span>
                                    <span className="myprofile-info-value">{year.charAt(0).toUpperCase() + year.slice(1).toLowerCase()}</span>
                                </p>
                                <p className="myprofile-info">
                                    <span className="myprofile-info-label">Language(s):</span>
                                    <span className="myprofile-info-value">{programmingLanguages.join(", ")}</span>
                                </p>
                                <p className="myprofile-info">
                                    <span className="myprofile-info-label">GitHub:</span>
                                    <span className="myprofile-info-value">{socialInfo}</span>
                                </p>
                                <button className='myprofile-button' onClick={handleEditProfile}>Edit Profile</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
