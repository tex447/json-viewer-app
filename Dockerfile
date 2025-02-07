FROM node:18-alpine

# Install git and other dependencies
RUN apk add --no-cache git

WORKDIR /app

# Copy package files and config files first
COPY package*.json ./
COPY vite.config.js ./
COPY components.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Install all dependencies first
RUN npm install
RUN npm install -D @types/node tailwindcss postcss autoprefixer
RUN npm install shadcn-ui@latest

# Initialize shadcn-ui (copy components directly instead of using CLI)
COPY ./src/components/ui /app/src/components/ui/

# Copy the rest of the code
COPY . .

# Expose development port
EXPOSE 3000

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev", "--", "--host"]