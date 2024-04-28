
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GenerateDocx() {
    const [templates, setTemplates] = useState([]);
    const [judges, setJudges] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedJudge, setSelectedJudge] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState({});
    const [numInputs, setNumInputs] = useState(0);
    const [file, setFile] = useState(null); // State for new file

    useEffect(() => {
        const fetchOptions = async () => {
            const response = await axios.get('http://localhost:8000/options');
            setTemplates(response.data.templates);
            setJudges(response.data.judges);
            setCompanies(response.data.companies);
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        if (selectedTemplate) {
            const templateData = templates.find((t) => t.id === parseInt(selectedTemplate, 10));
            setNumInputs(templateData.numFields || 0);
        } else {
            setNumInputs(0);
        }
    }, [selectedTemplate, templates]);


    const handleTemplateChange = (event) => {
        setSelectedTemplate(event.target.value);
    };

    const handleJudgeChange = (event) => {
        setSelectedJudge(event.target.value);
    };

    const handleCompanyChange = (event) => {
        setSelectedCompany(event.target.value);
    };




    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleTypeChange = (event) => setType(event.target.value);
    const handleFileChange = (event) => setFile(event.target.files[0]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedTemplate);
        console.log(selectedJudge, selectedCompany, name, description, type);
        const formData = {
            "template_name": parseInt(selectedTemplate, 10),
            "data": [selectedJudge, selectedCompany]
        };

        try {
            const response = await fetch('http://localhost:8000/user/generate_document', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            // Проверка статуса ответа
            if (!response.ok) {
                throw new Error('Ошибка при запросе на сервер');
            }
        
            // Получение потока данных
            const blob = await response.blob();
        
            // Создание ссылки на скачивание файла
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.docx'); // Установка имени файла
            document.body.appendChild(link);
            link.click();

            // Очистка ссылки после скачивания
            window.URL.revokeObjectURL(url);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error(error.response.data); // Access specific error details
            } else {
                console.error(error);
            }
        }
    };


    return (
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Generate Document</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Template Selection */}
            <div>
              <label htmlFor="template" className="block mb-1">Select Template:</label>
              <select id="template" value={selectedTemplate} onChange={handleTemplateChange} className="w-full p-2 border rounded">
                <option value="">Choose a template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>{template.name}</option>
                ))}
              </select>
            </div>
    
            {/* Judge Selection */}
            <div>
              <label htmlFor="judge" className="block mb-1">Select Judge:</label>
              <select id="judge" value={selectedJudge} onChange={handleJudgeChange} className="w-full p-2 border rounded">
                <option value="">Choose a judge</option>
                {judges.map((judge) => (
                  <option key={judge.id} value={judge.id}>{judge.fio}</option>
                ))}
              </select>
            </div>
    
            {/* Company Selection */}
            <div>
              <label htmlFor="company" className="block mb-1">Select Company:</label>
              <select id="company" value={selectedCompany} onChange={handleCompanyChange} className="w-full p-2 border rounded">
                <option value="">Choose a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
            </div>
    
            {/* Normal Input Fields */}
            <div>
              <label htmlFor="name" className="block mb-1">Name:</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full p-2 border rounded" />
            </div>
    
            <div>
              <label htmlFor="description" className="block mb-1">Description:</label>
              <input type="text" id="description" value={description} onChange={handleDescriptionChange} className="w-full p-2 border rounded" />
            </div>
    
            {/* File Input */}
            <div>
              <label htmlFor="file" className="block mb-1">File:</label>
              <input type="file" id="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
            </div>
    
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Docx</button>
          </form>
        </div>
      );
    }

export default GenerateDocx;