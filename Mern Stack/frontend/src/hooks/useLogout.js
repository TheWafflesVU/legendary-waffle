import { useAuthContext } from './useAuthContext'
import { useProjectsContext } from './useProjectsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchProjects } = useProjectsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchProjects({ type: 'SET_PROJECTS', payload: null })
  }

  return { logout }
}