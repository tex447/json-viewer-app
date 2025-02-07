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
│   │   ├── ui/
│   │   │   ├── badge.jsx
│   │   │   ├── card.jsx
│   │   │   ├── scroll-area.jsx
│   │   │   ├── separator.jsx
│   │   │   └── tooltip.jsx
│   │   ├── TreeView.jsx
│   │   └── MCPStats.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── utils/
│   │   ├── mcpValidator.js
│   │   └── formatters.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── docker/
│   └── Dockerfile.dev
├── docker-compose.yml
├── postcss.config.js
├── tailwind.config.js
├── package.json
└── vite.config.js
```

## UI Components

The application uses shadcn/ui components built on top of Radix UI primitives. Key components include:

### Core Components
- `TreeView`: Displays hierarchical JSON data with expandable nodes
- `MCPStats`: Shows statistical overview of MCP data structure
- `FileUpload`: Handles file input and format detection

### UI Components (src/components/ui/)
- `tooltip.jsx`: Provides context-sensitive information on hover
- `separator.jsx`: Visual dividers between content sections
- `scroll-area.jsx`: Customizable scrollable containers
- `card.jsx`: Container components for content organization
- `badge.jsx`: Label and tag components for metadata

## Technical Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: 
  - Tailwind CSS for utility classes
  - Shadcn UI components
  - Radix UI primitives
- **State Management**: React Context API
- **Development Environment**: Docker with hot-reload
- **Build Tools**:
  - Vite for fast development and building
  - PostCSS for CSS processing
  - ESM modules for modern JavaScript

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

### Theme Support

The application includes comprehensive theme support with:
- Light/Dark mode
- CSS variables for consistent styling
- Customizable color schemes
- Responsive design utilities

### Required Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tooltip": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

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