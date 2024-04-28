// UserForm.jsx
import React, { useState, useEffect } from 'react';

function UserForm({ mode, initialValues, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // Default role
  });

  useEffect(() => {
    if (mode === 'update' && initialValues) {
      setFormData(initialValues);
    }
  }, [mode, initialValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'create' ? 'Create User' : 'Update User'}</h2>

      {/* Username Input */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password" 
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required={mode === 'create'} // Only required for creating new users
        />
      </div>

      {/* Role Select */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
          Role:
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Save
        </button>
        <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;