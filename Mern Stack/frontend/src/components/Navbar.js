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
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
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
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
