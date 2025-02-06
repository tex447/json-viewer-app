import React, { useState } from 'react'
import './App.css'
import TreeView from './components/TreeView'

function App() {
  const [jsonData, setJsonData] = useState(null)
  const [autoDetectFormat, setAutoDetectFormat] = useState(true)
  const [error, setError] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target.result
      try {
        // Try parsing as regular JSON first
        const data = JSON.parse(text)
        setJsonData(data)
        setError(null)
      } catch (error) {
        if (autoDetectFormat) {
          try {
            // Try parsing as NDJSON
            const lines = text.trim().split('\n')
            const objects = lines.map(line => JSON.parse(line))
            setJsonData(objects)
            setError(null)
          } catch (error) {
            setError('Failed to parse file. Please check the file format.')
            setJsonData(null)
          }
        } else {
          setError('Failed to parse JSON file.')
          setJsonData(null)
        }
      }
    }

    reader.onerror = () => {
      setError('Error reading file')
      setJsonData(null)
    }

    if (file) {
      reader.readAsText(file)
    }
  }

  return (
    <div className="app">
      <h1>JSON Viewer</h1>
      <div className="format-toggle">
        <input
          type="checkbox"
          id="autoDetectFormat"
          checked={autoDetectFormat}
          onChange={(e) => setAutoDetectFormat(e.target.checked)}
        />
        <label htmlFor="autoDetectFormat">Auto-detect format (NDJSON/JSON)</label>
      </div>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="file-input"
      />
      <div className="json-viewer">
        {error && <div className="error">{error}</div>}
        {jsonData && <TreeView data={jsonData} />}
      </div>
    </div>
  )
}

export default App