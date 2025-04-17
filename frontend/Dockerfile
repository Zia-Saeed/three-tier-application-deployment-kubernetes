FROM node:18-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    DISABLE_WEBGL=1 \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install system dependencies (if needed)
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --no-progress --quiet --no-optional

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Start command
CMD ["npm", "start"]
