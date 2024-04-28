// Companies.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Assuming you have a separate CompanyForm component
import CompanyForm from './CompaniesForm'; 

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompanyForm, setShowCompanyForm] = useState({ show: false, mode: 'create', initialValues: {} });

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/admin/companies');
        setCompanies(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching companies:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = (formData) => {
    if (showCompanyForm.mode === 'create') {
      handleCreateCompany(formData);
    } else {
      handleUpdateCompany(formData);
    }
  };

  const handleCreateCompany = async (newCompanyData) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/companies', newCompanyData);
      setCompanies([...companies, response.data]);
      setShowCompanyForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error creating company:', err);
      // Handle error (e.g., display error message)
    }
  };

  const handleUpdateCompany = async (updatedCompanyData) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/companies/${updatedCompanyData.id}`, updatedCompanyData);
      setCompanies(companies.map(company => (company.id === updatedCompanyData.id ? response.data : company)));
      setShowCompanyForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error updating company:', err);
      // Handle error (e.g., display error message)
    }
  };

  const handleEditCompany = (company) => {
    setShowCompanyForm({
      show: true,
      mode: 'update',
      initialValues: company,
    });
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/companies/${companyId}`);
      setCompanies(companies.filter(company => company.id !== companyId));
    } catch (err) {
      console.error('Error deleting company:', err);
      // Handle error (e.g., display error message)
    }
  };

  // Enhanced error handling and loading states
  if (isLoading) {
    return <div>Loading companies...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Improved error display
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Companies</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowCompanyForm({ show: true, mode: 'create', initialValues: {} })}
        >
          Create Company
        </button>
      </div>

      {/* Companies Table */}
      {Array.isArray(companies) && companies.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Legal Address</th>
              <th scope="col" className="px-6 py-3">INN</th> 
              <th scope="col" className="px-6 py-3">OGRN</th>
              <th scope="col" className="px-6 py-3">Contact Info</th>
              <th scope="col" className="px-6 py-3">Website</th> 
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{company.name}</td>
                <td className="px-6 py-4">{company.legal_address}</td>
                <td className="px-6 py-4">{company.inn}</td>
                <td className="px-6 py-4">{company.ogrn}</td>
                <td className="px-6 py-4">{company.contact_info}</td>
                <td className="px-6 py-4">{company.website}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEditCompany(company)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteCompany(company.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Conditionally render CompanyForm */}
      {showCompanyForm.show && (
        <CompanyForm
          mode={showCompanyForm.mode}
          initialValues={showCompanyForm.initialValues}
          onSubmit={handleSubmit} 
          onClose={() => setShowCompanyForm({ show: false })}
        />
      )}
    </div>
  );
}


export default Companies;