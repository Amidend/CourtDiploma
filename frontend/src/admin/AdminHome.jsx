import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Judges from './components/Judges';
import UploadTemplate from './components/UploadTemplate'; 
import Companies from './components/Companies'; 
import Users from './components/Users';
import Documents from './components/Documents';  
function AdminHome() {
    const [activeSection, setActiveSection] = useState(null); // State to track active section
  
    const handleSectionClick = (section) => {
      setActiveSection(section);
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-blue-100">
        <div className="bg-white p-10 rounded shadow-md">
          <h1 className="text-2xl mb-4 text-center text-blue-500">Welcome, Admin!</h1>
          <div className="flex flex-col gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSectionClick('judges')}
            >
              Manage Judges
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSectionClick('template')}
            >
              Upload Template
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSectionClick('companies')}
            >
              Manage Companies
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSectionClick('users')}
            >
              Manage Users
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSectionClick('documents')}
            >
              Manage Documents
            </button>
          </div>
  
          {activeSection === 'documents' && <Documents />}
          {activeSection === 'users' && <Users />}
          {activeSection === 'judges' && <Judges />}
          {activeSection === 'template' && <UploadTemplate />}
          {activeSection === 'companies' && <Companies />}
        </div>
      </div>
    );
  }

export default AdminHome;