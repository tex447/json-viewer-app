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
      console.log('File content:', text.substring(0, 200)); // Debug log

      try {
        // Try NDJSON first if it contains newlines
        if (autoDetectFormat && text.includes('\n')) {
          try {
            const lines = text.trim().split('\n');
            console.log('NDJSON lines:', lines.length); // Debug log
            
            // Parse each line individually and filter out empty lines
            const objects = lines
              .filter(line => line.trim())
              .map(line => {
                try {
                  return JSON.parse(line);
                } catch (e) {
                  console.log('Failed to parse line:', line); // Debug log
                  throw e;
                }
              });

            console.log('Parsed objects:', objects.length); // Debug log
            const mcpValidation = validateMCPData(objects);
            console.log('MCP validation result:', mcpValidation); // Debug log
            
            if (mcpValidation.isValid) {
              setJsonData(mcpValidation.data);
              setIsMCPData(true);
              setError(null);
              return;
            }
          } catch (e) {
            console.log('NDJSON parsing error:', e); // Debug log
            // Continue to try regular JSON
          }
        }

        // Try as regular JSON
        const data = JSON.parse(text);
        console.log('Regular JSON parsed:', !!data); // Debug log
        const mcpValidation = validateMCPData(data);
        console.log('Regular JSON MCP validation:', mcpValidation); // Debug log
        
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
        console.log('Final parsing error:', error); // Debug log
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