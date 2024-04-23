import React, { useState, useEffect } from 'react';

function GenerateDoc() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(''); // Store selected ID
  const [selectedData1, setSelectedData1] = useState('');
  const [selectedData2, setSelectedData2] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/options');
        const data = await response.json();
        setTemplates(data.templates.map(template => ({ id: template.id, name: template.name }))); // Extract names
      } catch (error) {
        console.error('Error fetching templates:', error);
        // Handle error
      }
    };
    fetchTemplates();
  }, []);

  const handleGenerate = async () => {
    try {
      const response = await fetch('/user/generate_document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: selectedTemplateId, // Send selected ID
          data: [selectedData1, selectedData2],
        }),
      });
      const data = await response.json();
      console.log(data); // Handle response from backend
    } catch (error) {
      console.error('Error generating document:', error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Document Generator</h1>
  
     {/* Template Select */}
<div className="mb-4">
  <label htmlFor="template" className="block mb-2">
    Select Template:
  </label>
  <select 
    id="template"
    className="w-full p-2 border rounded"
    value={selectedTemplateId}
    onChange={(e) => setSelectedTemplateId(e.target.value)}
  >
    <option value="">Choose a template</option>
    {templates.map((template) => (
      <option key={template.id} value={template.id}>
        {template.name} 
      </option>
    ))}
  </select>
</div>

{/* Data 1 Select (Similar structure) */}
<div className="mb-4">
  <label htmlFor="data1" className="block mb-2">
    Select Data 1:
  </label>
  <select 
    id="data1"
    className="w-full p-2 border rounded"
    value={selectedData1}
    onChange={(e) => setSelectedData1(e.target.value)}
  >
    <option value="">Choose data 1</option>
    {templates.map((template) => (
      <option key={template.id} value={template.name}> {/* Value is now template name */}
        {template.name}
      </option>
    ))}
  </select>
</div>
  
      {/* Data 2 Select (Similar structure) */}
      <div className="mb-4">
        <label htmlFor="data2" className="block mb-2">
          Select Data 2:
        </label>
        <select
          id="data2"
          className="w-full p-2 border rounded"
          value={selectedData2}
          onChange={(e) => setSelectedData2(e.target.value)}
        >
          <option value="">Choose data 2</option>
          {/* Options for data 2 from your data source */}
        </select>
      </div>
  
      {/* Generate Button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerate}
      >
        Generate Document
      </button>
    </div>
  );
}

export default GenerateDoc;