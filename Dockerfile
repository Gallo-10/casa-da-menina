FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 8080
ENV PORT=8080

# Command to run the application
CMD ["npm", "start"]
