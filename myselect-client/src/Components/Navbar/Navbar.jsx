import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function Navbar() {
  const { loggedIn, user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/"> Homepage</Link>
        <Link to="/restaurants">Restaurants</Link>
      {(loggedIn && !user.isAdmin) && (
        <>
          {user.username}
        <Link to="/myrestaurants">My Restaurants</Link>
        </>
      )}

      {(loggedIn) && (
        <>
          <button onClick={logoutUser}>Logout</button>
        </>
      )}

      {!loggedIn && (
        <>
          <Link to="/signup"> Signup</Link>
          <Link to="/login"> Login</Link>
        </>
      )}

      {/* <button onClick={toggleTheme}>Change to {theme === 'light' ? 'dark' : 'light'} </button> */}
    </nav>
  );
}

export default Navbar;