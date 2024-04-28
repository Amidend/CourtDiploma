// Documents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Assuming you have a separate DocumentForm component
import DocumentForm from './DocumentsForm';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDocumentForm, setShowDocumentForm] = useState({ show: false, mode: 'create', initialValues: {} });

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/admin/documents'); // Change the URL
        setDocuments(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching documents:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleSubmit = (formData) => {
    if (showDocumentForm.mode === 'create') {
      handleCreateDocument(formData);
    } else {
      handleUpdateDocument(formData);
    }
  };

  const handleCreateDocument = async (newDocumentData) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/documents', newDocumentData); // Change the URL
      setDocuments([...documents, response.data]);
      setShowDocumentForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error creating document:', err);
      // Handle error (e.g., display error message)
    }
  };

  const handleUpdateDocument = async (updatedDocumentData) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/documents/${updatedDocumentData.id}`, updatedDocumentData); // Change the URL
      setDocuments(documents.map(document => (document.id === updatedDocumentData.id ? response.data : document)));
      setShowDocumentForm({ show: false }); // Close the form
    } catch (err) {
      console.error('Error updating document:', err);
      // Handle error (e.g., display error message)
    }
  };

  const handleEditDocument = (document) => {
    setShowDocumentForm({
      show: true,
      mode: 'update',
      initialValues: document,
    });
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/documents/${documentId}`); // Change the URL
      setDocuments(documents.filter(document => document.id !== documentId));
    } catch (err) {
      console.error('Error deleting document:', err);
      // Handle error (e.g., display error message)
    }
  };

  // Enhanced error handling and loading states
  if (isLoading) {
    return <div>Loading documents...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Improved error display
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowDocumentForm({ show: true, mode: 'create', initialValues: {} })}
        >
          Create Document
        </button>
      </div>

      {/* Documents Table */}
      {Array.isArray(documents) && documents.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Type</th> 
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Judge ID</th> 
              <th scope="col" className="px-6 py-3">Company ID</th> 
              <th scope="col" className="px-6 py-3">File</th> 
              <th scope="col" className="px-6 py-3">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{document.name}</td>
                <td className="px-6 py-4">{document.description}</td> 
                <td className="px-6 py-4">{document.type}</td> 
                <td className="px-6 py-4">{document.date}</td> 
                <td className="px-6 py-4">{document.judge_id}</td> 
                <td className="px-6 py-4">{document.company_id}</td> 
                <td className="px-6 py-4">{document.file}</td> 
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEditDocument(document)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteDocument(document.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Conditionally render DocumentForm */}
      {showDocumentForm.show && (
        <DocumentForm
          mode={showDocumentForm.mode}
          initialValues={showDocumentForm.initialValues}
          onSubmit={handleSubmit} 
          onClose={() => setShowDocumentForm({ show: false })}
        />
      )}
    </div>
  );
}

export default Documents;