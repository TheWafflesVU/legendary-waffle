import React, { useEffect, useState } from 'react';
import {useAuthContext} from "./useAuthContext";

const useFetchTag = (type) => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(
                    `/api/tag/${type}`,{
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                        }});
                const data = await response.json();
                setTags(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchTags();
        }

    }, [type, user]);

    return { tags, loading };
}

export default useFetchTag
