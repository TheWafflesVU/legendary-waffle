import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();

  const updateProfile = async (profileData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(profileData)
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // update the user in local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'UPDATE_PROFILE', payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
};
