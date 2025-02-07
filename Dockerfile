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

# Install dependencies
RUN npm install
RUN npm install -D @types/node tailwindcss postcss autoprefixer
RUN npm install -g shadcn-ui

# Add shadcn/ui components (using full path to ensure it's found)
RUN /usr/local/bin/npx shadcn-ui@latest add card
RUN /usr/local/bin/npx shadcn-ui@latest add badge
RUN /usr/local/bin/npx shadcn-ui@latest add separator
RUN /usr/local/bin/npx shadcn-ui@latest add scroll-area
RUN /usr/local/bin/npx shadcn-ui@latest add tooltip

# Copy the rest of the code
COPY . .

# Expose development port
EXPOSE 3000

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev", "--", "--host"]