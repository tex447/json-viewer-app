# JSON Viewer App

A simple web application for viewing JSON files in a human-readable format, specifically designed for MCP (Model Context Protocol) server JSON files. The application supports both standard JSON and NDJSON (Newline Delimited JSON) formats.

## Features

- **File Upload**: Easy drag-and-drop or click-to-upload functionality
- **Format Auto-detection**: Automatically detects and parses both JSON and NDJSON formats
- **Tree Visualization**: Hierarchical display of JSON data
- **Entity Grouping**: Groups data by entity type for better organization
- **Expandable/Collapsible Nodes**: Interactive tree nodes for better data exploration
- **Error Handling**: Clear error messages for invalid file formats or parsing issues

## Local Development

### Option 1: Direct Development

1. Clone the repository:
```bash
git clone https://github.com/tex447/json-viewer-app.git
cd json-viewer-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Option 2: Docker Development (Recommended)

Run the application using Docker Compose for development:

```bash
npm run start
```

This will:
- Start the development server with hot-reload
- Install all necessary dependencies
- Make the app available at http://localhost:5173

## Usage

1. Open the application in your web browser
2. Toggle "Auto-detect format" if needed (enabled by default)
3. Click "Choose File" or drag and drop a JSON file
4. The file contents will be displayed in a tree structure
5. Click on nodes to expand/collapse them

## File Format Support

### Standard JSON
```json
{
  "name": "example",
  "entityType": "test",
  "observations": ["observation 1", "observation 2"]
}
```

### NDJSON (Newline Delimited JSON)
```
{"type":"entity","name":"John_Smith","entityType":"person","observations":["Speaks Spanish"]}
{"type":"entity","name":"Acme_Corp","entityType":"organization","observations":["Founded in 2020"]}
```

## Technology Stack

- React (Vite)
- Node.js
- Docker (for development)
- Tailwind CSS

## Directory Structure

```
json-viewer-app/
├── src/
│   ├── components/
│   │   └── TreeView.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── docker-compose.yml
├── package.json
└── vite.config.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
