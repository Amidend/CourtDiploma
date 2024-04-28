import React, { useState, useEffect } from 'react';

function JudgeForm({ mode, initialValues, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
      fio: '',
      specialization: '',
      experience: '',
      contact_info: '',
      position: '',
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
      <h2>{mode === 'create' ? 'Create Judge' : 'Update Judge'}</h2> 
      <div className="mb-4">
        <label htmlFor="fio" className="block text-gray-700 text-sm font-bold mb-2">
          Name (FIO):
        </label>
        <input 
          type="text"
          id="fio"
          name="fio"
          value={formData.fio}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>

      {/* Specialization Input */}
      <div className="mb-4">
        <label htmlFor="specialization" className="block text-gray-700 text-sm font-bold mb-2">
          Specialization:
        </label>
        <input 
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>

      {/* Experience Input */}
      <div className="mb-4">
        <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
          Experience (Years):
        </label>
        <input 
          type="number" 
          id="experience"
          name="experience"
          value={formData.experience}
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

      {/* Position Input */}
      <div className="mb-4">
        <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">
          Position:
        </label>
        <input 
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>

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

export default JudgeForm;