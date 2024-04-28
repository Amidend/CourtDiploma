// CompanyForm.jsx
import React, { useState, useEffect } from 'react';

function CompanyForm({ mode, initialValues, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    legal_address: '',
    inn: '',
    ogrn: '',
    contact_info: '', 
    website: '',
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
      <h2>{mode === 'create' ? 'Create Company' : 'Update Company'}</h2>

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

      {/* Legal Address Input */}
      <div className="mb-4">
        <label htmlFor="legal_address" className="block text-gray-700 text-sm font-bold mb-2">
          Legal Address:
        </label>
        <input 
          type="text"
          id="legal_address"
          name="legal_address"
          value={formData.legal_address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>

      {/* INN Input */}
      <div className="mb-4">
        <label htmlFor="inn" className="block text-gray-700 text-sm font-bold mb-2">
          INN (Taxpayer Identification Number):
        </label>
        <input 
          type="text"
          id="inn"
          name="inn"
          value={formData.inn}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>

      {/* OGRN Input */}
      <div className="mb-4">
        <label htmlFor="ogrn" className="block text-gray-700 text-sm font-bold mb-2">
          OGRN (Main State Registration Number):
        </label>
        <input 
          type="text"
          id="ogrn"
          name="ogrn"
          value={formData.ogrn}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>

      {/* Contact Info Input */}
      <div className="mb-4">
        <label htmlFor="contact_info" className="block text-gray-700 text-sm font-bold mb-2">
          Contact Info:
        </label>
        <input 
          type="text"
          id="contact_info"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>

      {/* Website Input */}
      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">
          Website:
        </label>
        <input 
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
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

export default CompanyForm;