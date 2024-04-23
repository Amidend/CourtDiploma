
import React, { useState } from 'react';
import { Button, message } from 'antd';
import axios from 'axios';

const UploadTemplate = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {  if (!selectedFile) {
    message.error('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await axios.post('http://127.0.0.1:8000/admin/upload_template', formData);
    const { id, name } = response.data; // Assuming your API returns ID and filename
    message.success(`Template "${name}" uploaded successfully with ID: ${id}`);
  } catch (error) {
    // ... handle errors
  }
  }

  return (
    <div className="container mx-auto">
       <input type="file" onChange={handleFileChange} />
      <Button 
        type="primary" 
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
      </Button>
    </div>
  );
};


export default UploadTemplate;