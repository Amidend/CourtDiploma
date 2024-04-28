import React, { useState, useEffect } from 'react';

function DocumentForm({ mode, initialValues, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    date: '', // You might need a date picker component here
    judge_id: '', // Consider using a select dropdown for judges
    company_id: '', // Consider using a select dropdown for companies
    file: '', // You'll likely need a file upload component here
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
      <h2>{mode === 'create' ? 'Create Document' : 'Update Document'}</h2>

      {/* Name Input */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <textarea 
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Type Input */}
      {/* You might want to use a select dropdown here with options for different document types */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
          Type:
        </label>
        <input 
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Date Input */}
      {/* You'll likely need a date picker component here */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
          Date:
        </label>
        <input 
          type="date" 
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Judge ID Input */}
      {/* Consider using a select dropdown here to choose from available judges */}
      <div className="mb-4">
        <label htmlFor="judge_id" className="block text-gray-700 text-sm font-bold mb-2">
          Judge:
        </label>
        <input 
          type="number" 
          id="judge_id"
          name="judge_id"
          value={formData.judge_id}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        /> 
      </div>

      {/* Company ID Input */}
      {/* Consider using a select dropdown here to choose from available companies */}
      <div className="mb-4">
        <label htmlFor="company_id" className="block text-gray-700 text-sm font-bold mb-2">
          Company:
        </label>
        <input 
          type="number" 
          id="company_id"
          name="company_id"
          value={formData.company_id}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        /> 
      </div>

      {/* File Input */} 
      {/* You'll likely need a file upload component here */}
      <div className="mb-4">
        <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
          File:
        </label>
        <input 
          type="file" 
          id="file"
          name="file"
          onChange={handleChange} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
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

export default DocumentForm; 