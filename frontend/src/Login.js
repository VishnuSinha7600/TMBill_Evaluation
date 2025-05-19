
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//           try {
//         const res = await axios.post('http://localhost:5000/api/auth/login', {
//           username,
//           password,
//         });
//         alert('Login successful!');
//         navigate('/welcome');
//       } catch (err) {
//         console.error(err);
//         const errorMessage = err?.response?.data?.error || 'Login failed.';
//         alert(errorMessage);
//       } 
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />
//       <button onClick={handleLogin}>Login</button>

//        <p>Don't have an account?</p>
//     <button onClick={() => navigate('/register')}>Register</button>

//     <p>Forgot your password?</p>
// <button onClick={() => navigate('/reset-password')}>Reset Password</button>

  
//     </div>
//   );
// }


// export default Login;
