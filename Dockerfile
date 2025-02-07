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
RUN npm install -D @types/node tailwindcss postcss autoprefixer @shadcn/ui

# Add shadcn/ui components
RUN npx shadcn-ui@latest add card
RUN npx shadcn-ui@latest add badge
RUN npx shadcn-ui@latest add separator
RUN npx shadcn-ui@latest add scroll-area
RUN npx shadcn-ui@latest add tooltip

# Copy the rest of the code
COPY . .

# Expose development port
EXPOSE 3000

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev", "--", "--host"]