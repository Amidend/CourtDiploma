import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import GenerateDocx from './components/GenerateDocx';

function UserHome() {
  const [activeSection, setActiveSection] = useState(null); // State to track active section

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
        <div className="bg-white p-10 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Welcome, User!</h1>
      {/* User-specific content or actions */}
      <div className="flex flex-col gap-4">
        {/* Render buttons with onClick handlers */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSectionClick('generateDocx')}
        >
          Manage GenerateDocx
        </button>
      </div>
      {activeSection === 'generateDocx' && <GenerateDocx />}
    </div>
    </div>

  );
}

export default UserHome;