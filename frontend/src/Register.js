
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//         try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         username,
//         password,
//       });
//       alert('Registration successful!');
//       navigate('/login');
//     } catch (err) {
//       console.error(err); 
//       const errorMessage = err?.response?.data?.error || 'Registration failed.';
//       alert(errorMessage); 
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input type="text" placeholder='Username' name="" id="" />
//       <br />
//       <input type="email"
//         placeholder="Email"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />
//       <button onClick={handleRegister}>Register</button>

//       <p>Already have an account? </p>
//       <button onClick={() => navigate('/login')}>Back to Login</button> 
//     </div>
//   );
// }

// export default Register;
