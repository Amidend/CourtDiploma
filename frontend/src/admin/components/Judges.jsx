// Judges.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Assuming you have a separate JudgeForm component
import JudgeForm from './JudgeForm'; 

function Judges() {
  const [judges, setJudges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showJudgeForm, setShowJudgeForm] = useState({ show: false, mode: 'create', initialValues: {} });

  useEffect(() => {
    const fetchJudges = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/admin/judges');
        setJudges(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching judges:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJudges();
  }, []);

 
  const handleSubmit = (formData) => {
    if (showJudgeForm.mode === 'create') {
      handleCreateJudge(formData);
    } else {
      handleUpdateJudge(formData);
    }
  };

  const handleCreateJudge = async (newJudgeData) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/judges', newJudgeData);
      setJudges([...judges, response.data]);
      setShowJudgeForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error creating judge:', err);
      // Handle error (e.g., display error message)
    }
  };

  const handleUpdateJudge = async (updatedJudgeData) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/judges/${updatedJudgeData.id}`, updatedJudgeData);
      setJudges(judges.map(judge => (judge.id === updatedJudgeData.id ? response.data : judge)));
      setShowJudgeForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error updating judge:', err);
      // Handle error (e.g., display error message)
    }
  };
  const handleEditJudge = (judge) => {
    setShowJudgeForm({
      show: true,
      mode: 'update',
      initialValues: judge,
    });
  };
  const handleDeleteJudge = async (judgeId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/judges/${judgeId}`);
      setJudges(judges.filter(judge => judge.id !== judgeId));
    } catch (err) {
      console.error('Error deleting judge:', err);
      // Handle error (e.g., display error message)
    }
  };

   // Enhanced error handling and loading states
   if (isLoading) {
    return <div>Loading judges...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Improved error display
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Judges</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowJudgeForm({ show: true, mode: 'create', initialValues: {} })}
        >
          Create Judge
        </button>
      </div>
      
    {/* Judges Table (with conditional rendering and without Actions column) */}
    {Array.isArray(judges) && judges.length > 0 && (
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr> 
           
            <th scope="col" className="px-6 py-3">Name (FIO)</th>
            <th scope="col" className="px-6 py-3">Specialization</th>
            <th scope="col" className="px-6 py-3">Experience</th>
            <th scope="col" className="px-6 py-3">Contact Info</th>
            <th scope="col" className="px-6 py-3">Position</th> 
            {/* Removed Actions th */}
          </tr>
        </thead>
        <tbody>
          {judges.map((judge) => (
             <tr key={judge.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               
             
              <td className="px-6 py-4">{judge.fio}</td>
              <td className="px-6 py-4">{judge.specialization}</td>
              <td className="px-6 py-4">{judge.experience}</td>
              <td className="px-6 py-4">{judge.contact_info}</td>
              <td className="px-6 py-4">{judge.position}</td> 
              {/* Removed Actions td */}
              <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEditJudge(judge)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteJudge(judge.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Conditionally render JudgeForm */}
      {showJudgeForm.show && (
      <JudgeForm
        mode={showJudgeForm.mode}
        initialValues={showJudgeForm.initialValues}
        onSubmit={handleSubmit} // Pass handleSubmit here
        onClose={() => setShowJudgeForm({ show: false })}
      />
    )}
    </div>
  );
}

export default Judges;