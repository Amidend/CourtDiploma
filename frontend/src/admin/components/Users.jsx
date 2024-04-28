// Users.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Assuming you have a separate UserForm component
import UserForm from './UsersForm';

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserForm, setShowUserForm] = useState({ show: false, mode: 'create', initialValues: {} });

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/admin/users'); // Adjust URL if needed
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (formData) => {
    if (showUserForm.mode === 'create') {
      handleCreateUser(formData);
    } else {
      handleUpdateUser(formData);
    }
  };

  const handleCreateUser = async (newUserData) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/users', newUserData); 
      setUsers([...users, response.data]);
      setShowUserForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error creating user:', err);
      // Handle error (e.g., display error message)
    }
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/users/${updatedUserData.id}`, updatedUserData);
      setUsers(users.map(user => (user.id === updatedUserData.id ? response.data : user)));
      setShowUserForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error updating user:', err);
      // Handle error (e.g., display error message)
    }
  };

  const handleEditUser = (user) => {
    setShowUserForm({
      show: true,
      mode: 'update',
      initialValues: user,
    });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      // Handle error (e.g., display error message)
    }
  };

  // Enhanced error handling and loading states
  if (isLoading) {
    return <div>Loading users...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Improved error display
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowUserForm({ show: true, mode: 'create', initialValues: {} })}
        >
          Create User
        </button>
      </div>

      {/* Users Table */}
      {Array.isArray(users) && users.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Role</th> 
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.role}</td> 
                <td className="px-6 py-4">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Conditionally render UserForm */}
      {showUserForm.show && (
        <UserForm
          mode={showUserForm.mode}
          initialValues={showUserForm.initialValues}
          onSubmit={handleSubmit} 
          onClose={() => setShowUserForm({ show: false })} 
        />
      )}
    </div>
  );
}

export default Users;