// src/ResetPassword.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

const handleReset = async () => {
  try {
    await axios.post('http://localhost:5000/api/auth/reset-password', {
      email,
      newPassword
    });
    alert('Password reset successful!');
    navigate('/LoginRegisterPage');
  } catch (err) {
    // ✅ Safe error handling
    if (err.response && err.response.data && err.response.data.error) {
      alert('Reset failed: ' + err.response.data.error);
    } else {
      alert('Reset failed: ' + err.message);
    }
  }
};


 return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Reset Password</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Reset Password
        </button>
        {message && <p className="text-sm text-center text-green-600">{message}</p>}
      </div>
    </div>
  </div>
);

}

export default ResetPassword;
