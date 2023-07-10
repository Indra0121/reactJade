import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import jwt_decode from 'jwt-decode';


const SignInSignUpForm = () => {

  useEffect(() => {
    const overlayCon = document.getElementById('overlayCon');
    const container = document.getElementById('container');
    const btn1 = document.querySelector('.btnl');
    const btn2 = document.querySelector('.btnv');
    const alert = document.querySelector('#alert');
    btn1.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.add('right-panel-active');
    });

    btn2.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.remove('right-panel-active');
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      btn1.removeEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
      });

      btn2.removeEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('right-panel-active');
      });
    };
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sign Up submitted');

      if (firstName && lastName && email && password) {
        await axios.post('http://localhost:4000/user/users', {
          firstName,
          lastName,
          email,
          password,
        });
        console.log('Sign up successful');
      } else {
        console.log('All fields required');
      }

      // Clear form and error state
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sign In submitted');

      if (email && password) {
        console.log(`${email} ${password}`);

        const response = await axios.post('http://localhost:4000/auth/login', {
          email,
          password,
        });

        if (response.status === 200) {
          const token = response.data.token;
          // Store the token in localStorage or any other secure storage
          localStorage.setItem('token', token);
          
            console.log(token);
            const decodedToken = jwt_decode(token);

            // Retrieve the user ID from the decoded token
            const userId = decodedToken.userId;
            console.log(userId);
          localStorage.setItem('userId', userId);

        } else {
          // Handle login failure
          console.log('Login failed');
        }
      } else {
        console.log('Email and password are required');
      }

      // Clear form and error state
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred');
    }
  };
  
  
  

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <>
      <style></style>

      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            <div className="infield">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <label></label>
            </div>
            <div className="infield">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <label></label>
            </div>
            <div className="infield">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <label></label>
            </div>
            <div className="infield">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <label></label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <div className="infield">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <label></label>
            </div>
            <div className="infield">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <label></label>
            </div>
            <a href="#" className="forgot">
              Forgot your password?
            </a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container" id="overlayCon">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button className="btnv">Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="btnl">Sign Up</button>
            </div>
          </div>
          <button id="overlayBtn"></button>
        </div>
      </div>
    </>
  );
};

export default SignInSignUpForm;
