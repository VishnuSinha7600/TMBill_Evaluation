import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import signIn from '../assest/signin.png'
import signUp from '../assest/signup.png'
import './LoginRegisterPage.css'


const LoginRegister = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '' });

  const handleSignUpClick = () => setIsSignUp(true);
  const handleSignInClick = () => setIsSignUp(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert('Please fill in all login fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', loginData);

      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/welcome');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  const handleSignUp = async () => {
    if (!signUpData.username || !signUpData.email || !signUpData.password) {
      alert('Please fill in all sign-up fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', signUpData);
      alert('Registration successful! Please sign in.');
      setIsSignUp(false);
      setSignUpData({ username: '', email: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

 


  return (

<div className="w-full max-w-2xl h-[500px] mx-auto my-12 relative flex rounded-2xl overflow-hidden shadow-xl bg-white">
  {/* Form Wrapper */}
  <div className={`flex w-[200%] transition-transform duration-500 ease-in-out z-10 ${isSignUp ? 'translate-x-1/2' : '-translate-x-1/2'}`}>
    
    {/* Sign In Box */}
    <div className="w-1/2 p-10 flex flex-col justify-center items-center bg-white rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={loginData.email}
        onChange={handleLoginChange}
        className="w-full mb-4 px-4 py-3 border rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleLoginChange}
        className="w-full mb-4 px-4 py-3 border rounded-md"
      />
      <button
        type="button"
        onClick={handleLogin}
        className="bg-red-500 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-full transition"
      >
        Sign In
      </button>
      <p className="mt-6 text-sm">
        Forgot your password?{' '}
        <a onClick={() => navigate('/reset-password')} className="text-blue-600 underline cursor-pointer">Forget Password</a>
      </p>
    </div>

    {/* Sign Up Box */}
    <div className="w-1/2 p-10 flex flex-col justify-center items-center bg-white rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={signUpData.username}
        onChange={handleSignUpChange}
        className="w-full mb-4 px-4 py-3 border rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signUpData.email}
        onChange={handleSignUpChange}
        className="w-full mb-4 px-4 py-3 border rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signUpData.password}
        onChange={handleSignUpChange}
        className="w-full mb-4 px-4 py-3 border rounded-md"
      />
      <button
        type="button"
        onClick={handleSignUp}
        className="bg-red-500 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-full transition"
      >
        Sign Up
      </button>
    </div>
  </div>

  <div className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-700 ease-in-out z-0 ${isSignUp ? '-translate-x-[63%]' : 'translate-x-[12%]'}`}>


    <div className="w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-lg mb-4">Already have an account?</h1>
      <button
        onClick={handleSignUpClick}
        className="bg-white text-pink-500 px-6 py-2 rounded-full font-bold hover:bg-blue-500 hover:text-black transition"
      >
        Sign In
      </button>
      <img src={signUp} alt="Sign Up Visual" className="w-[20rem] mt-10" />
    </div>

    {/* Sign In Panel */}
    <div className="w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-lg  mb-4">Don't have an account?</h1>
      <button
        onClick={handleSignInClick}
        className="bg-white text-pink-500 px-6 py-2 rounded-full font-bold hover:bg-blue-500 hover:text-black transition"
      >
        Sign Up
      </button>
      <img src={signIn} alt="Sign In Visual" className="w-[20rem] mt-10" />
    </div>
  </div>
</div>

  );
};

export default LoginRegister;
