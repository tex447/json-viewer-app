import React, { useState } from 'react'
import './App.css'

function App() {
  const [jsonData, setJsonData] = useState(null)
  const [autoDetectFormat, setAutoDetectFormat] = useState(true)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target.result
      try {
        const data = JSON.parse(text)
        setJsonData(data)
      } catch (error) {
        if (autoDetectFormat) {
          try {
            // Try parsing as NDJSON
            const lines = text.trim().split('\n')
            const objects = lines.map(line => JSON.parse(line))
            setJsonData(objects)
          } catch (error) {
            console.error('Failed to parse file:', error)
          }
        }
      }
    }

    reader.readAsText(file)
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
        {jsonData && (
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        )}
      </div>
    </div>
  )
}

export default App