import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useDelete = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();

  const deleteUser = async (email) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/${email}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      // remove the user from local storage
      localStorage.removeItem('user');

      // update the auth context
      dispatch({type: 'LOGOUT'});

      // update loading state
      setIsLoading(false);
    }
  }

  return { deleteUser, isLoading, error };
}
