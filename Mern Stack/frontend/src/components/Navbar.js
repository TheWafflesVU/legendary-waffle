import { Link, useNavigate} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useDelete } from '../hooks/useDelete'
import { useAuthContext } from '../hooks/useAuthContext'
import "./Navbar.css"


const Navbar = () => {
  const { logout } = useLogout();
  const { deleteUser } = useDelete();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    // Once the account is deleted, log the user out
    if (window.confirm('Are you sure you want to delete your account?')) {
      await deleteUser(user.email);
      logout();
      navigate('/login');
    }
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="title">Waffle</h1>
        </Link>
        <div className="logout">
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
