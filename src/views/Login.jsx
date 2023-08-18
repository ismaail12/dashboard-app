import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { userLogin } from "../features/auth/authSlices";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import logo from "../images/logo.png";
import axios from "axios";
import { API_URL } from '../utils/constant';



const Login = () => {
  const navigate = useNavigate();
  const authState = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}login`,
        {
          email,
          password,
          role: 'admin'
        });

      if (response.status === 200) {
        sessionStorage.setItem('token',
          response.data.data.token);
        navigate('/dashboard');
        console.log(response.status);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };





  return (
    <Container maxWidth="xs">
      <Toaster />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <img src={logo} alt="" height={300} />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          error={emailError}
          helperText={emailError ? 'Email harus diisi' : null}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(email.length < 0);
          }
          }
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          error={passwordError}
          helperText={passwordError ? 'Password harus diisi' : null}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(password.length < 0);
          }}
        />
        <Button
          sx={{ marginTop: '1rem' }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={authState.isLoading ? null : handleLogin}
        >
          {authState.isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Box>

    </Container>
  );
};

export default Login;





