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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      try {
        // First try NDJSON if auto-detect is enabled
        if (autoDetectFormat && text.includes('\n')) {
          try {
            const lines = text.trim().split('\n');
            const objects = lines.map(line => JSON.parse(line));
            const mcpValidation = validateMCPData(objects);
            
            if (mcpValidation.isValid) {
              setJsonData(mcpValidation.data);
              setIsMCPData(true);
              setError(null);
              return;
            }
          } catch (e) {
            // If NDJSON parsing fails, continue to try regular JSON
          }
        }

        // Try parsing as regular JSON
        const data = JSON.parse(text);
        const mcpValidation = validateMCPData(data);
        
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
        <label htmlFor="autoDetectFormat">
          Auto-detect format (NDJSON/JSON)
        </label>
      </div>

      <input
        type="file"
        accept=".json,.ndjson"
        onChange={handleFileUpload}
        className="mb-6 p-2 border rounded w-full"
      />

      <div className="json-viewer">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {isMCPData && jsonData && (
          <MCPStats data={jsonData} />
        )}
        
        {jsonData && <TreeView data={jsonData} />}
      </div>
    </div>
  );
}

export default App;