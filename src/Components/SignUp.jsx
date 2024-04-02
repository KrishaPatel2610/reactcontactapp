//Sin-up.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/userActions';
import { signUp } from './AuthService';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleChange = (e) => {
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

    setFormData((prevState) => ({
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

  const validateConfirmPassword = () => {
    const { password, confirmPassword } = formData;
    if (!confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPasswordError: 'Please confirm your password.',
      }));
      return false;
    }

    if (password !== confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPasswordError: 'Passwords do not match.',
      }));
      return false;
    }

    setError((prevState) => ({
      ...prevState,
      confirmPasswordError: '',
    }));
    return true;
  };

  const handleSignUp = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      const { email, password } = formData;
      const user = signUp(email, password);
      dispatch(setUser(user));
      toast.success('User registered successfully!');
      navigate('/login');
    }
  };

  return (
    <div>
      <div className='signUp-page'>
        <h2 className='heading'>Register Yourself!</h2>

        <input
          type='email'
          className='input-field'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        {error.emailError && <p className='error'>{error.emailError}</p>}

        <input
          type='password'
          className='input-field'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        {error.passwordError && <p className='error'>{error.passwordError}</p>}

        <input
          type='password'
          className='input-field'
          placeholder='Confirm Password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {error.confirmPasswordError && (
          <p className='error'>{error.confirmPasswordError}</p>
        )}

        <button className='signUp-btn' onClick={handleSignUp}>
          Register
        </button>
      </div>
    </div>
  );
}

export default SignUp;
