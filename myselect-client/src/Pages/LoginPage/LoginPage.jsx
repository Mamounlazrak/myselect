import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        console.log('res.data', response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx = {{             
      display:'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: 12,
      paddingRight: 12
      }}>
        <Box component="h3" sx = {{marginBottom: 2, marginTop: 0}}>
            Login
        </Box>
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <button type="submit"> Login</button>
      </form> */}


      <Box 
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { maringTop: 2, marginBottom: 2, width: '35ch' }

            }}
            noValidate
            autoComplete="off">
            <div>
            <TextField
            label="Email"
            type="text"
            name='email'
            value={email}
            onChange={handleEmail}
            //   autoComplete="current-password"
            />
            </div>
            <div>
            <TextField
            label="Password"
            type="password"
            name='password'
            value={password}
            onChange={handlePassword}
            //   autoComplete="current-password"
            />
            </div>
          <Box sx = {{
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <Button type='submit'>Login</Button>
          </Box>
        </Box>

    </Box>
  );
}

export default LoginPage;