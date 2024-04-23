import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadTemplate from './components/UploadTemplate'; // Assuming UploadTemplate.jsx is in the same directory
import GenerateDoc from './components/GenerateDoc';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}


function App() {
  return (
    <Router> 
      <div>
        <Link to="/upload">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Template
          </button>
        </Link>
        <Link to="/generate"> 
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            GenerateDoc
          </button>
        </Link>
        <Routes> 
          <Route path="/upload" element={<UploadTemplate />} /> 
          <Route path="/generate" element={<GenerateDoc />} />
          {/* Other routes for your application */} 
        </Routes>
      </div>
    </Router>
  );
}

export default App;