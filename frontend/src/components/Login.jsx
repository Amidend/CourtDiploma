import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, password };
      const response = await axios.post('http://localhost:8000/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      // Extract user ID and role from response data
      const { userId, role } = response.data; 

      // Set cookies for user ID and role
      document.cookie = `user_id=${userId}`;
      document.cookie = `user_role=${role}`;

      // Navigate based on user role
      if (role === 'admin') {
        navigate('/admin'); 
      } else if (role === 'user') {
        navigate('/user'); 
      }

    } catch (error) {
      // Handle errors (e.g., display error messages)
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md">
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-blue-500">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-blue-500">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200">Login</button>
      </form>
    </div>
  );
}


export default Login;