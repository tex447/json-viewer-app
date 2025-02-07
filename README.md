# JSON Viewer App

A web application designed for viewing and analyzing MCP (Model Context Protocol) server JSON files in a human-readable format. The application provides an intuitive interface for exploring both standard JSON and NDJSON (Newline Delimited JSON) formats, with special features tailored for MCP server data structures.

## Features

- **Smart Format Detection**: 
  - Automatic detection of JSON and NDJSON formats
  - Specialized parsing for MCP server data structures
  - Support for nested entity relationships

- **Interactive Visualization**:
  - Hierarchical tree view with collapsible nodes
  - Entity type grouping and filtering
  - Relationship visualization between entities
  - Search functionality within loaded data

- **User Experience**:
  - Drag-and-drop file upload
  - Real-time parsing and validation
  - Error highlighting with detailed messages
  - Responsive design for all screen sizes
  - Dark/Light theme support

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/tex447/json-viewer-app.git
cd json-viewer-app
```

2. Start the application:
```bash
npm run start
```

The application will be available at http://localhost:3000 with hot-reload enabled.

### Manual Setup

1. Clone and install dependencies:
```bash
git clone https://github.com/tex447/json-viewer-app.git
cd json-viewer-app
npm install
```

2. Start development server:
```bash
npm run dev
```

## Supported Data Formats

### Standard JSON
```json
{
  "type": "entity",
  "name": "example_entity",
  "entityType": "example",
  "observations": [
    "observation 1",
    "observation 2"
  ]
}
```

### NDJSON (Newline Delimited JSON)
```
{"type":"entity","name":"entity1","entityType":"type1","observations":["obs1"]}
{"type":"entity","name":"entity2","entityType":"type2","observations":["obs2"]}
{"type":"relation","from":"entity1","to":"entity2","relationType":"connects"}
```

## Project Structure

```
json-viewer-app/
├── src/
│   ├── components/
│   │   ├── TreeView/
│   │   │   ├── TreeNode.jsx
│   │   │   └── index.jsx
│   │   ├── FileUpload/
│   │   ├── EntityGroup/
│   │   └── ErrorBoundary/
│   ├── hooks/
│   │   ├── useJsonParser.js
│   │   └── useFileReader.js
│   ├── utils/
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── docker/
│   └── Dockerfile.dev
├── docker-compose.yml
├── package.json
└── vite.config.js
```

## Technical Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Development Environment**: Docker with hot-reload
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint, Prettier

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm start`: Start Docker development environment

### Docker Development

The Docker setup includes:
- Hot-reload for rapid development
- Volume mapping for instant code updates
- Automatic dependency installation
- Port 3000 exposed for local access

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the established code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was inspired by the need for better MCP server data visualization
- Special thanks to all contributors who have helped shape the project