FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including shadcn/ui
RUN npm install
RUN npm install @shadcn/ui

# Copy the rest of the code
COPY . .

# Expose development port
EXPOSE 5173

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev", "--", "--host"]