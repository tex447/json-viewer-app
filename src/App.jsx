import React, { useState } from 'react';
import './App.css';
import TreeView from './components/TreeView';
import MCPStats from './components/MCPStats';
import { validateMCPData } from './utils/mcpValidator';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [autoDetectFormat, setAutoDetectFormat] = useState(true);
  const [error, setError] = useState(null);
  const [isMCPData, setIsMCPData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Test function
  const testExample = () => {
    const testData = [
      {
        type: 'entity',
        name: 'Test_Entity',
        entityType: 'Test',
        observations: ['Test Observation']
      }
    ];
    console.log('Testing example data...');
    console.log('Test data:', testData);
    const validation = validateMCPData(testData);
    console.log('Validation result:', validation);
    if (validation.isValid) {
      setJsonData(validation.data);
      setIsMCPData(true);
      setError(null);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      console.log('File content:', text.substring(0, 200));

      try {
        if (autoDetectFormat && text.includes('\n')) {
          try {
            const lines = text.trim().split('\n');
            console.log('NDJSON lines:', lines.length);
            
            const objects = lines
              .filter(line => line.trim())
              .map(line => {
                try {
                  return JSON.parse(line);
                } catch (e) {
                  console.log('Failed to parse line:', line);
                  throw e;
                }
              });

            console.log('Parsed objects:', objects.length);
            const mcpValidation = validateMCPData(objects);
            console.log('MCP validation result:', mcpValidation);
            
            if (mcpValidation.isValid) {
              setJsonData(mcpValidation.data);
              setIsMCPData(true);
              setError(null);
              return;
            }
          } catch (e) {
            console.log('NDJSON parsing error:', e);
          }
        }

        const data = JSON.parse(text);
        console.log('Regular JSON parsed:', !!data);
        const mcpValidation = validateMCPData(data);
        console.log('Regular JSON MCP validation:', mcpValidation);
        
        if (mcpValidation.isValid) {
          setJsonData(mcpValidation.data);
          setIsMCPData(true);
          setError(null);
        } else {
          setJsonData(data);
          setIsMCPData(false);
          setError(null);
        }
      } catch (error) {
        console.log('Final parsing error:', error);
        setError('Failed to parse file. Please check the file format.');
        setJsonData(null);
        setIsMCPData(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
      setJsonData(null);
      setIsMCPData(false);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">JSON Viewer</h1>
      
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="autoDetectFormat"
          checked={autoDetectFormat}
          onChange={(e) => setAutoDetectFormat(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="autoDetectFormat" className="mr-4">
          Auto-detect format (NDJSON/JSON)
        </label>

        <button
          onClick={testExample}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Example Data
        </button>
      </div>

      <input
        type="file"
        accept=".json,.ndjson"
        onChange={handleFileUpload}
        className="mb-6 p-2 border rounded w-full"
      />

      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-3 py-2 border rounded"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        )}
      </div>

      <div className="json-viewer">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {isMCPData && jsonData && (
          <MCPStats data={jsonData} />
        )}
        
        {jsonData && <TreeView data={jsonData} searchTerm={searchTerm} />}
      </div>
    </div>
  );
}

export default App;