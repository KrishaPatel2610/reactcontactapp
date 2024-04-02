//  Sign In Component
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from './AuthService';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/userActions';

function SignIn() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });
  const navigate = useNavigate();
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = () => {
    const { email } = formData;
    if (!email) {
      setError((prevState) => ({
        ...prevState,
        emailError: 'Email is required.',
      }));
      return false;
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError((prevState) => ({
        ...prevState,
        emailError: 'Please enter a valid email.',
      }));
      return false;
    }

    setError((prevState) => ({
      ...prevState,
      emailError: '',
    }));
    return true;
  };

  const validatePassword = () => {
    const { password } = formData;
    if (!password) {
      setError((prevState) => ({
        ...prevState,
        passwordError: 'Password is required.',
      }));
      return false;
    }

    if (password.length < 6) {
      setError((prevState) => ({
        ...prevState,
        passwordError: 'Password must be at least 6 characters long.',
      }));
      return false;
    }

    setError((prevState) => ({
      ...prevState,
      passwordError: '',
    }));
    return true;
  };

  const handleSignIn = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) {
      const { email, password } = formData;
      const user = login(email, password);
      if (user) {
        dispatch(setUser(user));
        navigate('/contact-list');
        toast.success('Logged in successfully!');
      } else {
        toast.error('Invalid credentials');
      }
    }
  };

  return (
    <div className='signIn-page'>
      <h2 className='heading'>Login</h2>
      <input
        type='email'
        className='input-field'
        placeholder='Email'
        name='email'
        value={formData.email}
        onChange={onHandleChange}
      />
      {error.emailError && <p className='error'>{error.emailError}</p>}

      <input
        type='password'
        className='input-field'
        placeholder='Password'
        name='password'
        value={formData.password}
        onChange={onHandleChange}
      />
      {error.passwordError && <p className='error'>{error.passwordError}</p>}

      <button className='signIn-btn' onClick={handleSignIn}>
        Login
      </button>
      <Link to='/sign-up' className='footer'>
        Register first!
      </Link>
    </div>
  );
}

export default SignIn;
