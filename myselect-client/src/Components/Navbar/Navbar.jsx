import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';




function Navbar() {
  const { loggedIn, user, logoutUser } = useContext(AuthContext);
  return (
    <Box sx = {{
      display: 'flex', 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 1,
      paddingBottom: 1
    }}>

      <Box component={Link} to="/" sx = {{textDecoration: 'none', color:'black', fontWeight: 'bold'}}>
      myselect
      </Box>

      {!loggedIn && (
        <>
      <Box sx = {{display: 'flex', gap:'10%'}}>
        <Button size="small" variant="outlined" component={Link} to="/login">Login</Button>
        <Button size ="small" variant="contained" component={Link} to="/signup">Signup</Button>
      </Box>
        </>
      )}

      {/* <Link to="/"> Homepage</Link>
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
      )} */}

      {/* <button onClick={toggleTheme}>Change to {theme === 'light' ? 'dark' : 'light'} </button> */}
    </Box>
  );
}

export default Navbar;